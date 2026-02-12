import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import { registerSchema } from "../schemas/authSchema.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    try {
        console.log(req.body);

        //Validar datos
        const { username, email, password } = registerSchema.parse(req.body);
        console.log(username, email, password);

        // ¿El usuario ya existe?
        const existingUser = await UserModel.findOne({
            $or: [{ email }, { username }]
        });

        if(existingUser){
            return res.status(400).json({ error: "Email or username already exists" });
        }

        console.log("Usuario no existe, se puede registrar");

        // Hashear contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Contraseña hasheada:", hashedPassword);

        // ¿Es admin? → El primero registrado
        const isFirstUSer = (await UserModel.countDocuments()) === 0;
        console.log("¿Es primer usuario?", isFirstUSer);

        // Crear usuario
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            isAdmin: isFirstUSer
        });

        console.log("Nuevo usuario creado:", newUser);

        // // Respuesta final
        // return res.status(201).json({
        // message: "User registered successfully",
        // user: {
        //     id: newUser._id,
        //     username: newUser.username,
        //     email: newUser.email,
        //     isAdmin: newUser.isAdmin
        //  },
        // token
        // });

        //Generar un token con JWT
        //Payload 
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })

        console.log("Token generado:", token);

        //Enviar como cookie 
        res.cookie('accesToken',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'PRODUCTION',
            samesite: process.env.NODE_ENV === 'PRODUCTION'? 'none' : 'lax',  // TRUE
            MaxAge : 60*60*1000

        })

         //header payload.signature
        console.log(newUser)
        res.json({newUser : newUser});
    

    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
};
