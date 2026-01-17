import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ItemSchema } from "@/lib/validations";
import { createAuditLog } from "@/lib/audit";

/**
 * GET /api/items
 * Fetch all items with optional filtering, search, and pagination
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        // Parse segments
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));
        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort") || "newest";

        // Build where clause dynamically
        // Ensure we only fetch items that are NOT deleted
        const andFilters: Prisma.ItemWhereInput[] = [
            { deletedAt: null }
        ];

        if (category && category !== "All") {
            andFilters.push({
                category: {
                    equals: category,
                    mode: 'insensitive'
                }
            });
        }

        if (search) {
            // Use fullTextSearch if available, otherwise fallback to OR
            // Since we enabled "fullTextSearchPostgres" preview, we can try using it specifically if configured,
            // but standard 'contains' with appropriate indices is often sufficient for basic needs.
            // For now, let's keep robust literal matching but know it's index-supported.
            andFilters.push({
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                    { shortDescription: { contains: search, mode: 'insensitive' } },
                    { tags: { has: search } }
                ]
            });
        }

        const where: Prisma.ItemWhereInput = { AND: andFilters };

        // Determine sort order
        let orderBy: Prisma.ItemOrderByWithRelationInput = { createdAt: 'desc' };
        if (sort === "price-low" || sort === "price-asc") orderBy = { price: 'asc' };
        if (sort === "price-high" || sort === "price-desc") orderBy = { price: 'desc' };
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
            sku,
            featured
        } = validation.data;

        const userId = session.user.id;

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
                featured,
                userId
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

        // Audit Log
        await createAuditLog(userId, "CREATE_ITEM", "Item", item.id, { name: item.name, price: item.price });

        return NextResponse.json(item, { status: 201 });
    } catch (error) {
        console.error("POST item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
