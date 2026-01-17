import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ItemSchema } from "@/lib/validations";
import { createAuditLog } from "@/lib/audit";

export const dynamic = "force-dynamic";

/**
 * GET /api/items/[id]
 * Fetch a single item by its ID
 */
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const item = await prisma.item.findFirst({
            where: {
                id,
                deletedAt: null // Ensure we don't fetch soft deleted items
            },
            include: {
                user: {
                    select: {
                        id: true,
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

/**
 * PUT /api/items/[id]
 * Update an existing item (Protected)
 */
export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to update items." },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Find the item first to check ownership
        const existingItem = await prisma.item.findFirst({
            where: { id, deletedAt: null }
        });

        if (!existingItem) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        // Check ownership (or admin status if implemented)
        const userId = (session.user as any).id;
        const isAdmin = session.user.email === 'admin@example.com';

        if (existingItem.userId !== userId && !isAdmin) {
            return NextResponse.json(
                { error: "Forbidden: You don't have permission to update this item." },
                { status: 403 }
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

        const updatedItem = await prisma.item.update({
            where: { id },
            data: validation.data,
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
        const changes = Object.keys(validation.data).reduce((acc, key) => {
            if (validation.data[key as keyof typeof validation.data] !== existingItem[key as keyof typeof existingItem]) {
                acc[key] = {
                    from: existingItem[key as keyof typeof existingItem],
                    to: validation.data[key as keyof typeof validation.data]
                };
            }
            return acc;
        }, {} as Record<string, any>);

        await createAuditLog(userId, "UPDATE_ITEM", "Item", id, changes);

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error("PUT item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

/**
 * DELETE /api/items/[id]
 * Delete an item (Protected)
 */
export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to delete items." },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Find the item first to check ownership
        const existingItem = await prisma.item.findUnique({
            where: { id }
        });

        if (!existingItem || existingItem.deletedAt) {
            return NextResponse.json(
                { error: "Item not found" },
                { status: 404 }
            );
        }

        // Check ownership or admin status
        const userId = (session.user as any).id;
        const isAdmin = session.user.email === 'admin@example.com';

        if (existingItem.userId !== userId && !isAdmin) {
            return NextResponse.json(
                { error: "Forbidden: You don't have permission to delete this item." },
                { status: 403 }
            );
        }

        // Soft delete instead of hard delete
        await prisma.item.update({
            where: { id },
            data: { deletedAt: new Date() }
        });

        // Audit Log
        await createAuditLog(userId, "DELETE_ITEM", "Item", id);

        return NextResponse.json(
            { message: "Item deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
