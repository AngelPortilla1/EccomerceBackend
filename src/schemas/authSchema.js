
import {z } from 'zod';

export const registerSchema = z.object({
    username: z.string().min(3).max(29),
    email:z.email().min(6).max(254),
    password: z.string().min(6).max(254)
})