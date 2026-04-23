
import ProductModel from '../models/ProductModel.js';
import { productSchema } from '../schemas/productSchema.js';
import { ZodError } from 'zod';

export const createProduct = async (req, res) => {
    try{
        const {name,description,price,stock,imageUrl}= productSchema.parse(req.body);


        // Create the product in the database
        const product = await ProductModel.create({
            name,
            description,
            price,
            stock,
            imageUrl
        });

        return res.status(201).json(product);
    }catch (error){
        res.json({message:'Error al crear el producto'})

    }

} 