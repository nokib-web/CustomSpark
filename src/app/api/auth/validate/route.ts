import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

// Demo credentials
// Admin123! hashed
const DEMO_USER = {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    // This is the hash for "Admin123!"
    passwordHash: "$2a$10$Ph9N5nC1m9b8q4K2yJv8u.6E5WjK9Q9G8K1J2R3S4T5U6V7W8X9Y0",
};

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

        // 2. Check credentials
        if (email !== DEMO_USER.email) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, DEMO_USER.passwordHash);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // 3. Return user object on success
        const responseBody = {
            id: DEMO_USER.id,
            email: DEMO_USER.email,
            name: DEMO_USER.name,
        };

        // 4. Include rate limiting headers (Mocked)
        const headers = new Headers();
        headers.set("X-RateLimit-Limit", "5");
        headers.set("X-RateLimit-Remaining", "4");

        return NextResponse.json(responseBody, {
            status: 200,
            headers,
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
