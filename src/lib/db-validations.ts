import prisma from "./prisma";

/**
 * Validate if a user is the owner of an item
 * @param itemId The item ID to check
 * @param userId The user ID to verify ownership against
 * @returns boolean indicating ownership
 */
export async function validateItemOwnership(itemId: string, userId: string): Promise<boolean> {
    try {
        const item = await prisma.item.findUnique({
            where: { id: itemId },
            select: { userId: true }
        });

        return item?.userId === userId;
    } catch (error) {
        console.error("Error in validateItemOwnership:", error);
        return false;
    }
}

/**
 * Check if an email address is available (not already taken)
 * @param email The email to check
 * @returns boolean indicating availability
 */
export async function isEmailAvailable(email: string): Promise<boolean> {
    try {
        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() },
            select: { id: true }
        });

        return !user;
    } catch (error) {
        console.error("Error in isEmailAvailable:", error);
        return false;
    }
}

/**
 * Check if an item has enough stock for an order
 * @param itemId The item ID
 * @param quantity The requested quantity
 * @returns boolean indicating if enough stock is available
 */
export async function validateStockAvailability(itemId: string, quantity: number): Promise<boolean> {
    try {
        const item = await prisma.item.findUnique({
            where: { id: itemId },
            select: { stock: true }
        });

        if (!item) return false;

        return item.stock >= quantity;
    } catch (error) {
        console.error("Error in validateStockAvailability:", error);
        return false;
    }
}
