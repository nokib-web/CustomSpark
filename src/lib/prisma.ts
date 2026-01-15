import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
        const masked = connectionString.replace(/:([^:@]+)@/, ':****@');
        console.log(`🔌 Initializing Prisma with: ${masked}`);
    } else {
        console.warn("⚠️ DATABASE_URL is not defined in environment variables");
    }
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
