import express from 'express'
import { connectDB } from './config/configdb.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express()

const PORT = 3000



connectDB().then(() => {
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
}).catch((error) => {
    console.error('Failed to connect to the database:', error);
});

export const disconnectDN = async() => {
    try{
        await mongoose.disconnect();
        console.log('✅ Base de datos desconectada exitosamente');
    } catch (error){
        console.log(' Error al desconectar de mongo db:',error)
    }
}