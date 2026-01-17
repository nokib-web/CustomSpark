import prisma from "./prisma";

/**
 * Options for paginated queries
 */
export interface PaginationOptions {
    page?: number;
    limit?: number;
}

/**
 * Find a user by their email address
 * @param email The email address to search for
 * @returns The user object or null if not found
 */
export async function getUserByEmail(email: string) {
    try {
        return await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });
    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        throw new Error("Failed to fetch user by email");
    }
}

/**
 * Find a user by their ID
 * @param id The user ID to search for
 * @returns The user object or null if not found
 */
export async function getUserById(id: string) {
    try {
        return await prisma.user.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error("Error in getUserById:", error);
        throw new Error("Failed to fetch user by ID");
    }
}

/**
 * Find a single item by ID with its associated user information
 * @param id The item ID
 * @returns The item object or null if not found
 */
export async function getItemById(id: string) {
    try {
        return await prisma.item.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });
    } catch (error) {
        console.error("Error in getItemById:", error);
        throw new Error("Failed to fetch item by ID");
    }
}

/**
 * Fetch items filtered by category with pagination
 * @param category The category name
 * @param options Pagination options (page, limit)
 */
export async function getItemsByCategory(category: string, options: PaginationOptions = {}) {
    const { page = 1, limit = 10 } = options;
    try {
        const where = category && category !== "All"
            ? {
                category: { equals: category, mode: "insensitive" as const },
                deletedAt: null
            }
            : { deletedAt: null };

        const [items, total] = await Promise.all([
            prisma.item.findMany({
                where,
                orderBy: { createdAt: "desc" },
                take: limit,
                skip: (page - 1) * limit,
                include: {
                    user: { select: { name: true, email: true } }
                }
            }),
            prisma.item.count({ where })
        ]);

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        console.error("Error in getItemsByCategory:", error);
        throw new Error("Failed to fetch items by category");
    }
}

/**
 * Search across items name, shortDescription, and description
 * @param query The search query string
 * @param options Pagination options
 */
export async function searchItems(query: string, options: PaginationOptions = {}) {
    const { page = 1, limit = 10 } = options;
    try {
        const where = {
            OR: [
                { name: { contains: query, mode: "insensitive" as const } },
                { description: { contains: query, mode: "insensitive" as const } },
                { shortDescription: { contains: query, mode: "insensitive" as const } }
            ],
            deletedAt: null
        };

        const [items, total] = await Promise.all([
            prisma.item.findMany({
                where,
                orderBy: { createdAt: "desc" },
                take: limit,
                skip: (page - 1) * limit,
                include: {
                    user: { select: { name: true, email: true } }
                }
            }),
            prisma.item.count({ where })
        ]);

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        console.error("Error in searchItems:", error);
        throw new Error("Failed to search items");
    }
}

/**
 * Get featured items for the homepage
 * @param limit Maximum number of items to return
 */
export async function getFeaturedItems(limit: number = 4) {
    try {
        return await prisma.item.findMany({
            where: {
                featured: true,
                deletedAt: null
            },
            orderBy: { createdAt: "desc" },
            take: limit,
            include: {
                user: { select: { name: true, email: true } }
            }
        });
    } catch (error) {
        console.error("Error in getFeaturedItems:", error);
        throw new Error("Failed to fetch featured items");
    }
}

/**
 * Get all items created by a specific user
 * @param userId The ID of the owner
 * @param options Pagination options
 */
export async function getUserItems(userId: string, options: PaginationOptions = {}) {
    const { page = 1, limit = 10 } = options;
    try {
        const [items, total] = await Promise.all([
            prisma.item.findMany({
                where: {
                    userId,
                    deletedAt: null
                },
                orderBy: { createdAt: "desc" },
                take: limit,
                skip: (page - 1) * limit
            }),
            prisma.item.count({ where: { userId } })
        ]);

        return {
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        console.error("Error in getUserItems:", error);
        throw new Error("Failed to fetch user items");
    }
}

/**
 * Atomic update of item stock
 * @param itemId The item to update
 * @param quantity The quantity to add (use negative for subtraction)
 */
export async function updateItemStock(itemId: string, quantity: number) {
    try {
        return await prisma.item.update({
            where: { id: itemId },
            data: {
                stock: {
                    increment: quantity
                }
            }
        });
    } catch (error) {
        console.error("Error in updateItemStock:", error);
        throw new Error("Failed to update item stock");
    }
}

/**
 * Delete all items associated with a user
 * @param userId The user whose items should be deleted
 */
export async function deleteUserItems(userId: string) {
    try {
        return await prisma.item.deleteMany({
            where: { userId }
        });
    } catch (error) {
        console.error("Error in deleteUserItems:", error);
        throw new Error("Failed to delete user items");
    }
}
