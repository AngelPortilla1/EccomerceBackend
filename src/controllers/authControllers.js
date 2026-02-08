import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import { registerSchema } from "../schemas/authSchema.js";


export const registerUser = async (req, res) => {
    try{
        console.log(req.body);

        //Extraer y validar todos los datos del usuario
        const { username, email, password } = registerSchema.parse(req.body);
        console.log(username, email, password);

        //Comprobar si ya existe el usuario por email o username
        const existingUser = await UserModel.findOne({
            $or: [{ email }, { username }]
        });
        
        if(existingUser){
            return res.status(400).json({ error: "Email or username already exists" });
        }

        console.log("Usuario no existe, se puede registrar");
        //res.json({ message: "User can be registered", username, email });


        //Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña hasheada:", hashedPassword);
        res.json({message: "Password hashed", hashedPassword });


        //Verificar si es admin
        const isAdmin = (await UserModel.countDocuments()) === 0; // Si no hay usuarios, el primero será admin
        console.log("¿Es admin?", isAdmin);
        res.json({ message: "Admin check completed", isAdmin });


        //Crear un nuevo usuario 
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role: "user"
        });

    }catch(error) {
        res.json({ error: error.message });

    }
}