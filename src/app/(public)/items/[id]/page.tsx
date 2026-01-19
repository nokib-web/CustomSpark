import { notFound } from "next/navigation";
import Link from "next/link";
import { LucideChevronRight, LucideHome } from "lucide-react";
import ProductDetailsView from "@/components/ProductDetailsView";
import { Item } from "@/types";
import prisma from "@/lib/prisma";

async function getItem(id: string): Promise<Item | null> {
    try {
        const item = await prisma.item.findUnique({
            where: { id, deletedAt: null },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true
                    }
                }
            }
        });
        return item as any;
    } catch (_error) {
        console.error("Prisma error:", _error);
        return null;
    }
}

async function getRelatedItems(category: string, currentId: string): Promise<Item[]> {
    try {
        const items = await prisma.item.findMany({
            where: {
                category,
                id: { not: currentId },
                deletedAt: null
            },
            take: 4,
            orderBy: { createdAt: "desc" }
        });
        return items as any;
    } catch (error) {
        console.error("Failed to fetch related items:", error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getItem(id);
    if (!item) return { title: "Product Not Found" };

    return {
        title: `${item.name} | Custom Spark`,
        description: item.description,
        openGraph: {
            title: item.name,
            description: item.description,
            images: [item.imageUrl],
        },
    };
}

export default async function ItemDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getItem(id);

    if (!item) {
        notFound();
    }

    const relatedItems = await getRelatedItems(item.category, item.id!);

    // JSON-LD Structured Data
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": item.name,
        "image": item.imageUrl,
        "description": item.description,
        "offers": {
            "@type": "Offer",
            "price": item.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
        },
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="container mx-auto px-6">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-3 text-sm font-bold text-slate-400 mb-10 overflow-x-auto no-scrollbar py-2">
                    <Link href="/" className="flex items-center gap-2 hover:text-primary-600 transition-colors shrink-0">
                        <LucideHome size={16} />
                        <span>Home</span>
                    </Link>
                    <LucideChevronRight size={14} className="shrink-0" />
                    <Link href="/items" className="hover:text-primary-600 transition-colors shrink-0">Items</Link>
                    <LucideChevronRight size={14} className="shrink-0" />
                    <span className="text-slate-900 dark:text-white truncate transition-colors shrink-0">{item.name}</span>
                </nav>

                {/* Client Side Details View */}
                <ProductDetailsView item={item} relatedItems={relatedItems} />
            </div>
        </main>
    );
}
