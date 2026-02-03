import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_DB_URI.replace('<db_username>',process.env.MONGO_DB_USER).replace('<db_password>',process.env.MONGO_DB_PASSWORD);
    } catch (error){

    }
}