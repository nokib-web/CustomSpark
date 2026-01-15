import { z } from "zod";

/**
 * Login Form Validation
 */
export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean().default(false),
});

/**
 * Signup Form Validation
 */
export const SignupSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must contain at least one uppercase letter")
            .regex(/[0-9]/, "Must contain at least one number")
            .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
        terms: z.boolean().refine((val) => val === true, "You must accept the terms"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

/**
 * Add Item Form Validation
 * Reusing the core schema but ensuring it matches the form needs
 */
export const ItemSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    shortDescription: z
        .string()
        .min(10, "Short description is required")
        .max(150, "Short description should be under 150 characters"),
    description: z.string().min(20, "Full description must be more detailed"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    imageUrl: z.string().url("Valid image URL is required"),
    stock: z.number().int().nonnegative(),
    sku: z.string().optional(),
    tags: z.array(z.string()),
});

export const AddItemSchema = ItemSchema;

/**
 * Profile Update Validation
 */
export const ProfileUpdateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    image: z.string().url("Valid image URL is required").optional().or(z.literal("")),
});

/**
 * Contact Form Validation
 */
export const ContactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupInput = z.infer<typeof SignupSchema>;
export type AddItemInput = z.infer<typeof AddItemSchema>;
export type ProfileUpdateInput = z.infer<typeof ProfileUpdateSchema>;
export type ContactInput = z.infer<typeof ContactSchema>;
