import express from 'express'
import { connectDB,disconnectDB } from './config/configdb.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'

dotenv.config();



const app = express()

const PORT = 3000

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

