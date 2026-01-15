"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideShoppingBag, LucideArrowRight } from "lucide-react";
import { Item } from "@/types";

export default function ProductsShowcase() {
    const [products, setProducts] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("/api/items?limit=6");
                const data = await res.json();
                // Handle the new paginated structure
                setProducts(Array.isArray(data.items) ? data.items : []);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };
        fetchItems();
    }, []);

    return (
        <section id="products" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="max-w-xl">
                        <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Featured Collection</h2>
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Discover Our Best Sellers</h3>
                        <p className="text-slate-600 dark:text-slate-400">Explore our most popular and highly-rated items across all categories.</p>
                    </div>
                    <Link
                        href="/items"
                        className="group flex items-center gap-2 font-bold text-primary-600 hover:text-primary-500 py-2"
                    >
                        View All Products
                        <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse h-[400px]" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <Link href={`/items/${product.id}`} key={product.id} className="group rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all">
                                <div className="aspect-[4/3] overflow-hidden relative">
                                    <Image
                                        src={product.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary-600 z-10">
                                        {product.category}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h4>
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-2xl font-black text-primary-600">${product.price.toFixed(2)}</span>
                                        <button className="h-10 w-10 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-colors">
                                            <LucideShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
