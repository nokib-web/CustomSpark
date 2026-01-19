import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const prismaClientSingleton = () => {
    const connectionString =
        process.env.DATABASE_URL ||
        process.env.POSTGRES_PRISMA_URL ||
        process.env.POSTGRES_URL;

    if (!connectionString) {
        throw new Error("❌ DATABASE_URL is not defined in environment variables.");
    }

    const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Initializing Prisma with: ${masked}`);

    const pool = new pg.Pool({ connectionString });
    const adapter = new PrismaPg(pool);

    return new PrismaClient({
        adapter,
        log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    }).$extends({
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

const prisma = (globalForPrisma.prisma ?? prismaClientSingleton());

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
