import { DefaultSession } from "next-auth";

/**
 * User related types
 */
export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: "user" | "admin";
}

/**
 * Product/Item related types
 */
export interface Item {
    id: string;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    sku?: string;
    tags: string[];
    createdAt: Date | string;
}

/**
 * Category type
 */
export type Category = "electronics" | "fashion" | "home" | "sports" | "accessories";

/**
 * API Response generic type
 */
export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
    status: number;
}

/**
 * Paginated Response type
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasMore: boolean;
}

/**
 * Form State types
 */
export interface FormState {
    isLoading: boolean;
    isSuccess: boolean;
    error: string | null;
}

/**
 * Auth Session type - Extending NextAuth Session
 */
declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
        } & DefaultSession["user"];
    }
}

export type AuthSession = DefaultSession & {
    user: User;
};

/**
 * Filter and Sort Options
 */
export interface FilterOptions {
    category?: Category | "all";
    search?: string;
    minPrice?: number;
    maxPrice?: number;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export interface ItemQueryOptions extends FilterOptions {
    sort?: SortOption;
    limit?: number;
    page?: number;
}
