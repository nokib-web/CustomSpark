import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validate input
        const validation = RegisterSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid registration data", details: validation.error.format() },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;

        // 2. In a real app, check if user exists in DB
        // For demo, we'll just mock success
        console.log(`Registering user: ${name} (${email})`);

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Return success (simulating DB save)
        return NextResponse.json(
            {
                message: "Account created successfully",
                user: { name, email }
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
