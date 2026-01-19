import { GET, POST } from "@/app/api/items/route";
import { NextRequest } from "next/server";
import { resetDb, seedTestDb, disconnectDb } from "../db-helpers";
import { User } from "@prisma/client";
import { getServerSession } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
    getServerSession: jest.fn(),
}));

describe("Items API Integration Tests", () => {
    let testUser: User;

    beforeAll(async () => {
        // Ensure env var is set or warn
        if (!process.env.DATABASE_URL) {
            console.warn("WARNING: DATABASE_URL not set for tests.");
        }
    });

    beforeEach(async () => {
        await resetDb();
        testUser = (await seedTestDb()).user;
    });

    afterAll(async () => {
        await disconnectDb();
    });

    describe("GET /api/items", () => {
        it("should return a list of items", async () => {
            const req = new NextRequest("http://localhost:3000/api/items");
            const response = await GET(req);

            expect(response.status).toBe(200);
            const data = await response.json();

            expect(data.items).toHaveLength(1);
            expect(data.items[0].name).toBe("Test Item");
            expect(data.pagination.total).toBe(1);
        });

        it("should filter items by search query", async () => {
            const req = new NextRequest("http://localhost:3000/api/items?search=Test");
            const response = await GET(req);
            const data = await response.json();

            expect(data.items).toHaveLength(1);
        });

        it("should return empty list when search does not match", async () => {
            const req = new NextRequest("http://localhost:3000/api/items?search=NonExistent");
            const response = await GET(req);
            const data = await response.json();

            expect(data.items).toHaveLength(0);
        });
    });

    describe("POST /api/items", () => {
        it("should create a new item when authenticated", async () => {
            // Mock authenticated session
            (getServerSession as jest.Mock).mockResolvedValue({
                user: {
                    id: testUser.id,
                    name: testUser.name,
                    email: testUser.email
                }
            });

            const newItem = {
                name: "New Item",
                shortDescription: "A short description",
                description: "A longer description needed here for validation",
                price: 150.00,
                category: "Fashion",
                imageUrl: "https://example.com/new.jpg",
                stock: 5,
                tags: ["new"],
                featured: false
            };

            const req = new NextRequest("http://localhost:3000/api/items", {
                method: "POST",
                body: JSON.stringify(newItem)
            });

            const response = await POST(req);
            expect(response.status).toBe(201);

            const data = await response.json();
            expect(data.name).toBe(newItem.name);
            expect(data.userId).toBe(testUser.id);
        });

        it("should return 401 when not authenticated", async () => {
            (getServerSession as jest.Mock).mockResolvedValue(null);

            const req = new NextRequest("http://localhost:3000/api/items", {
                method: "POST",
                body: JSON.stringify({})
            });

            const response = await POST(req);
            expect(response.status).toBe(401);
        });

        it("should return 400 for validation errors", async () => {
            (getServerSession as jest.Mock).mockResolvedValue({
                user: { id: testUser.id }
            });

            const invalidItem = {
                name: "Sh", // Too short
                price: -10 // Negative
            };

            const req = new NextRequest("http://localhost:3000/api/items", {
                method: "POST",
                body: JSON.stringify(invalidItem)
            });

            const response = await POST(req);
            expect(response.status).toBe(400);

            const data = await response.json();
            expect(data.error).toBe("Validation failed");
        });
    });
});
