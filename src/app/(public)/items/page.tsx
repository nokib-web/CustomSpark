"use client";

import { useEffect, useState } from "react";
import { Item } from "@/types/item";
import { LucideShoppingBag, LucideSearch, LucideFilter } from "lucide-react";

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/items")
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h1 className="text-4xl font-bold text-slate-900 dark:text-white">All Products</h1>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search items..."
                                className="w-full pl-10 pr-4 py-2 border rounded-xl bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 outline-none focus:border-primary-500"
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-medium">
                            <LucideFilter size={18} />
                            Filter
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="h-80 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {items.map((item) => (
                            <div key={item.id} className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all h-full flex flex-col">
                                <div className="relative aspect-square overflow-hidden">
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{item.name}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-primary-600">${item.price.toFixed(2)}</span>
                                        <button className="h-10 w-10 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl flex items-center justify-center hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white transition-colors">
                                            <LucideShoppingBag size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
