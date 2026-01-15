import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

/**
 * PATCH /api/items/[id]/restore
 * Restore a soft-deleted item (Protected)
 */
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized. Please sign in to restore items." },
                { status: 401 }
            );
        }

        const { id } = await params;

        // Find the item including soft deleted ones
        const existingItem = await prisma.item.findUnique({
            where: { id }
        });

        if (!existingItem) {
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
                { error: "Forbidden: You don't have permission to restore this item." },
                { status: 403 }
            );
        }

        if (!existingItem.deletedAt) {
            return NextResponse.json(
                { message: "Item is not deleted" },
                { status: 400 }
            );
        }

        // Restore item
        const restoredItem = await prisma.item.update({
            where: { id },
            data: { deletedAt: null }
        });

        // Audit Log
        await createAuditLog(userId, "RESTORE_ITEM", "Item", id);

        return NextResponse.json(restoredItem);
    } catch (error) {
        console.error("RESTORE item error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
