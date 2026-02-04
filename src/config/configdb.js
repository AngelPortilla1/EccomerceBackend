import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
    try {
        //console.log('🔍 Conectando a MongoDB...');
        
        // Limpiar variables de entorno
        const user = process.env.MONGO_DB_USER?.trim();
        const password = process.env.MONGO_DB_PASSWORD?.trim();
        const dbName = process.env.MONGO_DB_NAME?.trim();
        const uri = process.env.MONGO_DB_URI?.trim();
        
        // URL-encode las credenciales
        const encodedUser = encodeURIComponent(user);
        const encodedPassword = encodeURIComponent(password);
        const encodedName = encodeURIComponent(dbName);
        
        const dbURI = uri
            .replace('<db_username>', encodedUser)
            .replace('<db_password>', encodedPassword)
            .replace('<db_name>', encodedName);
        
        await mongoose.connect(dbURI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ Base de datos conectada exitosamente');
        return true;
    } catch (error) {
        console.error('❌ Error de conexión MongoDB:', error.message);
        console.error('Código:', error.code);
        process.exit(1);
    }
};
export const disconnectDB = async() => {
    try{
        await mongoose.disconnect();
        console.log('✅ Base de datos desconectada exitosamente');
    } catch (error){
        console.log(' Error al desconectar de mongo db:',error)
    }
}