import { Item } from "@/types/item";

// In-memory store for items
export const items: Item[] = [
    {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise-canceling technology.",
        price: 299.99,
        category: "electronics",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        createdAt: new Date(),
    },
    {
        id: "2",
        name: "Mechanical Gaming Keyboard",
        description: "RGB backlit mechanical keyboard with tactile switches.",
        price: 129.50,
        category: "electronics",
        imageUrl: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
        createdAt: new Date(),
    },
    {
        id: "3",
        name: "Minimalist Leather Wallet",
        description: "Genuine leather wallet with slim design and RFID protection.",
        price: 45.00,
        category: "accessories",
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        createdAt: new Date(),
    },
];
