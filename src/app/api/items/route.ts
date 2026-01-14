import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { items } from "@/lib/db";
import { ItemSchema } from "@/lib/validations";

/**
 * GET /api/items
 * Fetch all items with optional filtering
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    let filteredItems = [...items];

    if (category) {
        filteredItems = filteredItems.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
        );
    }

    if (limit) {
        const limitNum = parseInt(limit);
        if (!isNaN(limitNum)) {
            filteredItems = filteredItems.slice(0, limitNum);
        }
    }

    return NextResponse.json(filteredItems);
}

/**
 * POST /api/items
 * Create a new item (Protected)
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to create an item." },
                { status: 401 }
            );
        }

        const body = await req.json();
        const validation = ItemSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { error: "Validation failed", details: validation.error.format() },
                { status: 400 }
            );
        }

        const newItem = {
            ...validation.data,
            id: Math.random().toString(36).substring(2, 9),
            createdAt: new Date(),
        } as any;

        // In a real app, we would push to DB here
        items.push(newItem);

        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
