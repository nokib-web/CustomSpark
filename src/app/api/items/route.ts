import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ItemSchema } from "@/lib/validations";

/**
 * GET /api/items
 * Fetch all items with optional filtering, search, and pagination
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Parse segments
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "newest";

        // Build where clause
        const where: any = {
            AND: [
                category ? {
                    category: {
                        equals: category,
                        mode: 'insensitive'
                    }
                } : {},
                search ? {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { description: { contains: search, mode: 'insensitive' } },
                        { shortDescription: { contains: search, mode: 'insensitive' } }
                    ]
                } : {}
            ]
        };

        // Determine sort order
        let orderBy: any = { createdAt: 'desc' };
        if (sort === "price-low") orderBy = { price: 'asc' };
        if (sort === "price-high") orderBy = { price: 'desc' };
        if (sort === "oldest") orderBy = { createdAt: 'asc' };

        // Fetch items and total count in parallel
        const [items, total] = await Promise.all([
            prisma.item.findMany({
                where,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                },
                orderBy,
                take: limit,
                skip: (page - 1) * limit
            }),
            prisma.item.count({ where })
        ]);

        return NextResponse.json({
            items,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.error("GET items error:", error);
        return NextResponse.json(
            { error: "Failed to fetch items" },
            { status: 500 }
        );
    }
}

/**
 * POST /api/items
 * Create a new item (Protected)
 */
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
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

        const {
            name,
            shortDescription,
            description,
            price,
            category,
            imageUrl,
            stock,
            tags,
            sku
        } = validation.data;

        const item = await prisma.item.create({
            data: {
                name,
                shortDescription,
                description,
                price,
                category,
                imageUrl,
                stock,
                tags,
                sku,
                userId: (session.user as any).id
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error("POST item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
