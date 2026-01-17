import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
        seed: "tsx prisma/seed.ts",
    },
    datasource: {
        // Attempt to find any valid connection string or use a dummy one for build/generate
        // automatic Vercel Postgres env vars: POSTGRES_PRISMA_URL, POSTGRES_URL
        url: process.env["DATABASE_URL"] ||
            process.env["POSTGRES_PRISMA_URL"] ||
            process.env["POSTGRES_URL"] ||
            "postgresql://dummy:password@localhost:5432/mydb", // Fallback for build phase
    },
});
