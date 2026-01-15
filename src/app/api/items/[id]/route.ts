import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * GET /api/items/[id]
 * Fetch a single item by its ID
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const item = await prisma.item.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });

        if (!item) {
            return NextResponse.json(
                { error: `Item with ID ${id} not found.` },
                { status: 404 }
            );
        }

        return NextResponse.json(item);
    } catch (error) {
        console.error("GET item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
