import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { RegisterSchema } from "@/lib/validations";

export const dynamic = "force-dynamic";

/**
 * POST /api/auth/register
 * Register a new user
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("DEBUG - Received body:", { ...body, password: "****" });

        // 1. Validate input
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Validation failed",
                    details: validation.error.format()
                },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;
        const normalizedEmail = email.toLowerCase();
        console.log("DEBUG - Looking for existing user:", normalizedEmail);

        // 2. Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "A user with this email already exists" },
                { status: 409 }
            );
        }

        // 3. Hash password
        console.log("DEBUG - Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 12);
        console.log("DEBUG - Password hashed. Creating user...");

        // 4. Create new user
        const user = await prisma.user.create({
            data: {
                name,
                email: normalizedEmail,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        return NextResponse.json(
            {
                message: "Account created successfully",
                user
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("DEBUG - Registration error:", error);
        if (error instanceof Error) {
            console.error("DEBUG - Error message:", error.message);
            console.error("DEBUG - Error stack:", error.stack);
        }
        return NextResponse.json(
            {
                error: "Internal Server Error",
                message: error instanceof Error ? error.message : "An unknown error occurred"
            },
            { status: 500 }
        );
    }
}
