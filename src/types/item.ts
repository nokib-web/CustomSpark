import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Valid image URL is required"),
    createdAt: z.date().optional(),
});

export type Item = z.infer<typeof ItemSchema> & {
    id: string;
    createdAt: Date;
};
