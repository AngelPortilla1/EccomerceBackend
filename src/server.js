import express from 'express'
import { connectDB } from './config/configdb.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express()

const PORT = 3000




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

connectDB();