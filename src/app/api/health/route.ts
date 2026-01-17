import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    const start = Date.now();
    try {
        // Simple query to check DB connection
        await prisma.$queryRaw`SELECT 1`;

        const duration = Date.now() - start;

        return NextResponse.json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            database: {
                status: "connected",
                latency: `${duration}ms`
            }
        });
    } catch (error) {
        console.error("Health check failed:", error);
        return NextResponse.json(
            {
                status: "unhealthy",
                timestamp: new Date().toISOString(),
                error: "Database connection failed"
            },
            { status: 503 }
        );
    }
}
