import express from "express";
import { registerUser } from "../controllers/authControllers.js";


const router = express.Router()


router.post('/register',registerUser)

router.post('/login',(req, res)=>{
    console.log(' Hiciste una peticion POST A  /login')
    res.json({ message: 'Registro recibido', status: 'success' })
})

router.post('/logout',(req, res)=>{
    console.log(' Hiciste una peticion POST A  /logout')
    res.json({ message: 'Registro recibido', status: 'success' })
})

router.get('/profile',(req, res)=>{
    console.log(' Hiciste una peticion GET A  /profile')
    res.json({ message: 'Registro recibido', status: 'success' })
})

export default router