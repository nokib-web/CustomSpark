import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is not defined. Please set it in your environment variables.");
    }

    const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
    console.log(`🔌 Initializing Prisma with: ${masked}`);

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
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
