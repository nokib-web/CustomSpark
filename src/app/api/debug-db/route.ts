import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Just try a simple query
        await prisma.$queryRaw`SELECT 1`;

        return NextResponse.json({
            status: "connected",
            message: "Successfully connected to the database.",
            env_check: {
                DATABASE_URL: !!process.env.DATABASE_URL,
                POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
                POSTGRES_URL: !!process.env.POSTGRES_URL,
            },
            timestamp: new Date().toISOString(),
        });
    } catch (error: any) {
        return NextResponse.json({
            status: "error",
            message: "Failed to connect to the database.",
            error: error.message,
            env_check: {
                DATABASE_URL: !!process.env.DATABASE_URL,
                POSTGRES_PRISMA_URL: !!process.env.POSTGRES_PRISMA_URL,
                POSTGRES_URL: !!process.env.POSTGRES_URL,
            },
            hint: "Check your DATABASE_URL in Vercel environment variables and ensure your DB allows connections from Vercel.",
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
