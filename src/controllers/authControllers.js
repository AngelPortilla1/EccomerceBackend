import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel.js";
import { registerSchema } from "../schemas/authSchema.js";
import jwt from "jsonwebtoken";
import { ca } from "zod/locales";


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
        res.cookie('accessToken',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'PRODUCTION',
            sameSite: process.env.NODE_ENV === 'PRODUCTION'? 'none' : 'lax',
            maxAge : 60*60*1000
        })

         //header payload.signature
        console.log(newUser)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            }
        });
    

    } catch(error) {
        return res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        // Buscar usuario por email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generar JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log("Token generado para login:", token);

        // Enviar como cookie
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PRODUCTION',
            sameSite: process.env.NODE_ENV === 'PRODUCTION' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const profile = async (req,res) => {
    // extraer el token de las cookies
    console.log("Cookies recibidas:", req.cookies);
    const token = req.cookies.accessToken
    console.log("Token extraído:", token);
    
    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }
    
    try {
        //Decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("Token decodificado:", decoded);

        // Buscar el usuario en la BD
        const user = await UserModel.findById(decoded.userId).select("-password");
        
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json({
            user: user,
        });

    }catch(error){
        console.log("Error decodificando token:", error.message);
        return res.status(401).json({ error: "Token inválido o expirado" });
    }
}   
