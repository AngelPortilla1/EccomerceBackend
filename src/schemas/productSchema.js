import z from 'zod';

export const productSchema = z.object({
    name :z.string().min(3).max(50),
    description: z.string().min(10).max(500),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    imageUrl : z.url(),
})