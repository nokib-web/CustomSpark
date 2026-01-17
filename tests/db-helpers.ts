import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

// We use a dedicated instance for testing interactions to avoid singleton issues
// and ensure we are hitting the configured test DB.
const prisma = new PrismaClient();

export const resetDb = async () => {
    if (process.env.NODE_ENV === 'production') {
        throw new Error('Attempted to reset DB in production environment');
    }

    const tablenames = await prisma.$queryRaw<
        Array<{ tablename: string }>
    >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

    const tables = tablenames
        .map(({ tablename }) => tablename)
        .filter((name) => name !== '_prisma_migrations')
        .map((name) => `"public"."${name}"`)
        .join(', ');

    if (tables.length > 0) {
        try {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
        } catch (error) {
            console.error("Failed to reset DB:", error);
        }
    }
};

export const seedTestDb = async () => {
    // Create a test user
    const password = await hash("password123", 12);
    const user = await prisma.user.create({
        data: {
            name: "Test User",
            email: "test@example.com",
            password,
            role: "USER"
        }
    });

    // Create an item
    const item = await prisma.item.create({
        data: {
            name: "Test Item",
            description: "A test item description",
            shortDescription: "Short desc",
            price: 100,
            category: "Electronics",
            imageUrl: "https://example.com/image.jpg",
            stock: 10,
            userId: user.id,
            tags: ["test", "demo"]
        }
    });

    return { user, item };
};

export const disconnectDb = async () => {
    await prisma.$disconnect();
};

export { prisma };
