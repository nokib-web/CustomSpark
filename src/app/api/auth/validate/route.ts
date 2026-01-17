import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { users } from "@/lib/db";

export const dynamic = "force-dynamic";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validate request body
        const validation = LoginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 }
            );
        }

        const { email, password } = validation.data;

        // 2. Find user in persistent store
        const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 3. Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 4. Return user object on success
        const responseBody = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        // 5. Include rate limiting headers (Mocked)
        const headers = new Headers();
        headers.set("X-RateLimit-Limit", "5");
        headers.set("X-RateLimit-Remaining", "4");

        return NextResponse.json(responseBody, {
            status: 200,
            headers,
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
