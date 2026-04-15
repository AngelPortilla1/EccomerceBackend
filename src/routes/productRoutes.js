import express from 'express';
import { createProduct } from '../controllers/ProductController.js';

const router = express.Router();


//rutas publicas
router.get('/products', (req, res) => {
    res.json({ message: 'Lista de productos' });
});

router.get('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Detalles del producto con ID: ${id}` });
});


//rutas privadas (Solo administradores pueden moidifcar productos))
router.post('/products', createProduct);

router.put('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Producto con ID: ${id} actualizado` });
});

router.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `Producto con ID: ${id} eliminado` });
});

export default router;

