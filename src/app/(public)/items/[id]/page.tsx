import { notFound } from "next/navigation";
import Link from "next/link";
import { LucideChevronRight, LucideHome } from "lucide-react";
import ProductDetailsView from "@/components/ProductDetailsView";
import { Item } from "@/types";

async function getItem(id: string): Promise<Item | null> {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    try {
        const res = await fetch(`${baseUrl}/api/items/${id}`, {
            cache: "no-store", // Ensure we get fresh data
        });
        if (!res.ok) return null;
        return res.json();
    } catch (_error) {
        console.error("Fetch error:", _error);
        return null;
    }
}

async function getRelatedItems(category: string, currentId: string): Promise<Item[]> {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    try {
        const res = await fetch(`${baseUrl}/api/items?category=${category}&limit=5`, {
            cache: "no-store",
        });
        if (!res.ok) return [];
        const data = await res.json();
        const items: Item[] = Array.isArray(data.items) ? data.items : [];
        return items.filter(item => item.id !== currentId);
    } catch (_error) {
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
