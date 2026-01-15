import { Item, User } from "@/types";

export interface DbUser extends User {
    passwordHash: string;
}

// Global variable to persist in-memory DB across hot-reloads in Dev mode
const globalForDb = globalThis as unknown as {
    items: Item[] | undefined;
    users: DbUser[] | undefined;
};

// In-memory store for items
export const items: Item[] = globalForDb.items ?? [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        shortDescription: "Experience pure audio bliss with our flagship noise-canceling headphones.",
        description: "High-quality wireless headphones with noise-canceling technology, 40-hour battery life, and crystal-clear sound quality for professional audio monitoring and immersive music experience.",
        price: 299.99,
        category: "electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        stock: 45,
        sku: "ELEC-HD-101",
        tags: ["audio", "wireless", "premium"],
        createdAt: new Date(),
    } as Item,
    {
        id: "2",
        name: "Mechanical Gaming Keyboard",
        shortDescription: "Tactile, responsive, and beautifully backlit for the ultimate gaming setup.",
        description: "RGB backlit mechanical keyboard with tactile switches, dedicated media controls, and a detachable palm rest. Engineered for gamers who demand precision and durability.",
        price: 129.50,
        category: "electronics",
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        stock: 20,
        sku: "ELEC-KB-202",
        tags: ["gaming", "mechanical", "rgb"],
        createdAt: new Date(),
    } as Item,
    {
        id: "3",
        name: "Minimalist Leather Wallet",
        shortDescription: "Sleek, secure, and crafted from 100% genuine full-grain leather.",
        description: "Genuine leather wallet with slim design and RFID protection. Features six card slots and a dedicated bill compartment while maintaining a ultra-thin profile for front pocket carry.",
        price: 45.00,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        stock: 100,
        sku: "ACC-WL-303",
        tags: ["leather", "essentials", "minimalist"],
        createdAt: new Date(),
    } as Item,
];

// In-memory store for users
export const users: DbUser[] = globalForDb.users ?? [
    {
        id: "admin-1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        // This is the hash for "Admin123!"
        passwordHash: "$2a$10$Ph9N5nC1m9b8q4K2yJv8u.6E5WjK9Q9G8K1J2R3S4T5U6V7W8X9Y0",
    }
];

if (process.env.NODE_ENV !== "production") {
    globalForDb.items = items;
    globalForDb.users = users;
}
