import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    shortDescription: z.string().min(10, "Short description is required").max(150),
    description: z.string().min(20, "Full description must be more detailed"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Valid image URL is required"),
    stock: z.number().int().nonnegative(),
    sku: z.string().optional(),
    tags: z.array(z.string()),
    createdAt: z.date().optional(),
});

export type Item = z.infer<typeof ItemSchema> & {
    id: string;
    createdAt: Date;
};
