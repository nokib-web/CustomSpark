import { NextRequest, NextResponse } from "next/server";
import { items } from "@/lib/db";

/**
 * GET /api/items/[id]
 * Fetch a single item by its ID
 */
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const item = items.find((item) => item.id === id);

    if (!item) {
        return NextResponse.json(
            { error: `Item with ID ${id} not found.` },
            { status: 404 }
        );
    }

    return NextResponse.json(item);
}
