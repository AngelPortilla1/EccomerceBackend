import express from 'express'
import { connectDB,disconnectDB } from './config/configdb.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';

dotenv.config();



const app = express()

const PORT = 3000

//CORS
app.use(cors({
    origin: process.env.FRONTED_URL, // Reemplaza con el origen de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization','Cookie','Set-Cookie'], // Encabezados permitidos
    credentials: true // Permitir cookies y credenciales
}))

//MIDDLEWARE para desempaquetar el body
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//RUTAS API
app.use('/api/auth',authRoutes)


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
}).catch(() => {
    disconnectDB()
});

