import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/user/items
 * Fetch all items created by the current authenticated user
 */
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession();

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(req.url);
        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.max(1, parseInt(searchParams.get("limit") || "10"));

        const userId = (session.user as any).id;

        const [items, total] = await Promise.all([
            prisma.item.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
                take: limit,
                skip: (page - 1) * limit,
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true
                        }
                    }
                }
            }),
            prisma.item.count({ where: { userId } })
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
        console.error("GET user items error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
