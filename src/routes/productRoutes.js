import express from 'express';
import { createProduct, updateProduct, getProductById,getAllProducts, deleteProduct} from '../controllers/ProductController.js';
import { get } from 'mongoose';

const router = express.Router();


//rutas publicas
router.get('/', getAllProducts);

router.get('/:id',getProductById );



//rutas privadas (Solo administradores pueden moidifcar productos))
router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;

