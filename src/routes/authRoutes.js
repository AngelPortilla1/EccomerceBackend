import express from "express";
import { registerUser , profile, loginUser} from "../controllers/authControllers.js";


const router = express.Router()


router.post('/register',registerUser)

router.post('/login', loginUser)

router.post('/logout',(req, res)=>{
    console.log(' Hiciste una peticion POST A  /logout')
    res.json({ message: 'Registro recibido', status: 'success' })
})

router.get('/profile',profile)

export default router