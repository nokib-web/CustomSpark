import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
    const connectionString =
        process.env.DATABASE_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        process.env.POSTGRES_URL;

    if (!connectionString) {
        console.warn("⚠️ No valid database connection string found. Database operations will fail.");
        return null;
    }

    const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Initializing Prisma with: ${masked}`);

    let adapter;
    try {
        const pool = new Pool({ connectionString });
        adapter = new PrismaPg(pool);
    } catch (err) {
        console.warn("⚠️ Failed to initialize Prisma Adapter (PG).", err);
        return null;
    }

    const client = new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });

    return client.$extends({
        query: {
            $allModels: {
                async $allOperations({ operation, model, args, query }) {
                    const start = performance.now();
                    const result = await query(args);
                    const end = performance.now();
                    const duration = end - start;

                    if (duration > 500) {
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

const prisma = (globalForPrisma.prisma ?? prismaClientSingleton()) as any;

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
