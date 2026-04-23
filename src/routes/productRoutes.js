import express from 'express';
import { createProduct, updateProduct } from '../controllers/ProductController.js';

const router = express.Router();


//rutas publicas
router.get('/', (req, res) => {
    res.json({ message: 'Lista de productos' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Detalles del producto con ID: ${id}` });
});


//rutas privadas (Solo administradores pueden moidifcar productos))
router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Producto con ID: ${id} eliminado` });
});

export default router;

