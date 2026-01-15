import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { users } from "@/lib/db";

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

        // 2. Check if user already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return NextResponse.json(
                { error: "A user with this email already exists" },
                { status: 400 }
            );
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create new user
        const newUser = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            email,
            role: "user" as const,
            passwordHash: hashedPassword,
        };

        // 5. Save to in-memory DB
        users.push(newUser);

        console.log(`User registered successfully: ${name} (${email})`);

        return NextResponse.json(
            {
                message: "Account created successfully",
                user: { name, email, id: newUser.id }
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
