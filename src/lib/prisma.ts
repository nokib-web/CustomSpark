import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
    // Attempt to find any valid connection string from common Vercel/Postgres env vars
    const connectionString =
        process.env.DATABASE_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        process.env.POSTGRES_URL;

    if (!connectionString) {
        console.warn("⚠️ No valid database connection string found (checked DATABASE_URL, POSTGRES_PRISMA_URL, POSTGRES_URL). Prisma might fail at runtime.");
        return new PrismaClient() as any;
    }

    const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Initializing Prisma with: ${masked}`);

    // Reverting to standard PrismaClient initialization without adapter
    // This is often more robust for handling various connection string formats
    // specifically when 'pg' fails with "Invalid URL".
    const client = new PrismaClient({
        datasources: {
            db: {
                url: connectionString,
            },
        },
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    } as any);

    return client.$extends({
        query: {
            $allModels: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const end = performance.now();
                    const duration = end - start;

                    if (duration > 500) { // Log queries slower than 500ms
                        console.warn(`⚠️ Slow Query [${model}.${operation}] took ${duration.toFixed(2)}ms`);
                    }

                    return result;
                },
            },
        },
    });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
