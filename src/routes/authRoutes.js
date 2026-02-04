import express from "express";


const router = express.Router()


router.post('/register',(req, res)=>{
    console.log(' Hiciste una peticion POST A  /register')
    res.json({ message: 'Registro recibido', status: 'success' })
})

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