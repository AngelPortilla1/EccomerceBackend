
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

        return res.status(201).json({messagge:'Producto creado exitosamente', product});
    }catch (error){
        if (error instanceof ZodError) {
            return res.status(400).json({ message: 'Error de validación', errors: error.errors });
        }
        return res.status(500).json({message:'Error al crear el producto',error:error.message});
    }

} 


export const updateProduct = async (req, res) =>{
    try{
        //1. Validar los datos de entrada con Zod
        const validateData = productSchema.partial().parse(req.body);

        //2. Buscar el producto por ID y actualizarlo
        const {id} = req.params;
        const updatedProduct = await ProductModel.findByIdAndUpdate(id, validateData, {new:true,runValidators:true});

        //3. Mamejar el caso de que el producto no existe
        if (!updatedProduct) {
            return res.status(404).json({message:'Producto no encontrado'});
        }
        return res.status(200).json({message:'Producto actualizado exitosamente', product: updatedProduct});


    }catch (error){
        res.json({message:'Error al actualizar el producto', error: error.message})
    }
}


export const getProductById = async (req,res)=>{
    try{
        const product = await ProductModel.findById(req.params.id);
        return res.status(200).json({product});

    }catch (error){
        return res.status(500).json({message:'Error al obtener el producto', error: error.message})

    }
}


export const getAllProducts = async (req,res)=>{
    try{
        const products = await ProductModel.find();
        return res.status(200).json({products});
    }catch (error){
        return res.status(500).json({message:'Error al obtener los productos', error: error.message})
    } 
}


export const deleteProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedProduct = await ProductModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({message:'Producto no encontrado'});
        }

        return res.status(200).json({message:'Producto eliminado exitosamente', product: deletedProduct});
    }catch (error){
        return res.status(500).json({message:'Error al eliminar el producto', error: error.message})
    }
}