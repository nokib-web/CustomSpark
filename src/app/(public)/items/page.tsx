"use client";

import { useState, useEffect, useMemo } from "react";
import { Item } from "@/types/item";
import ProductCard from "@/components/ProductCard";
import {
    LucideSearch,
    LucideLayoutGrid,
    LucideFilter,
    LucideArrowUpDown,
    LucideInbox,
    LucideLoader2,
    LucideChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Electronics", "Fashion", "Home", "Sports", "Accessories"];
const SORT_OPTIONS = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
    { label: "Popular", value: "popular" },
];

export default function ItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [sortBy, setSortBy] = useState("newest");
    const [displayCount, setDisplayCount] = useState(8);

    useEffect(() => {
        const fetchItems = async () => {
            setIsLoading(true);
            try {
                const res = await fetch("/api/items");
                const data = await res.json();
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchItems();
    }, []);

    const filteredAndSortedItems = useMemo(() => {
        let result = [...items];

        // Search
        if (searchQuery) {
            result = result.filter(item =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category
        if (activeCategory !== "All") {
            result = result.filter(item =>
                item.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "price-asc") return a.price - b.price;
            if (sortBy === "price-desc") return b.price - a.price;
            if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            return 0; // "popular" or default
        });

        return result;
    }, [items, searchQuery, activeCategory, sortBy]);

    const displayedItems = filteredAndSortedItems.slice(0, displayCount);
    const hasMore = filteredAndSortedItems.length > displayCount;

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="container mx-auto px-6">
                {/* Header & Search */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                    <div className="max-w-xl animate-in fade-in slide-in-from-left duration-700">
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                            Our <span className="text-primary-600">Products</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            Explore our handpicked selection of premium items crafted for greatness.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto animate-in fade-in slide-in-from-right duration-700">
                        <div className="relative w-full sm:w-80 group">
                            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-600 transition-colors h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search premium goods..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="relative w-full sm:w-auto group">
                            <LucideArrowUpDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 z-10" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full sm:w-48 pl-12 pr-10 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:ring-4 focus:ring-primary-600/10 focus:border-primary-600 appearance-none text-sm font-bold text-slate-700 dark:text-slate-300 cursor-pointer transition-all"
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <LucideChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="flex items-center gap-3 overflow-x-auto pb-6 mb-8 no-scrollbar scroll-smooth">
                    <div className="flex items-center gap-2 pr-4 border-r border-slate-200 dark:border-slate-800 shrink-0">
                        <LucideFilter size={18} className="text-slate-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Filters</span>
                    </div>
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-bold transition-all shrink-0 active:scale-95",
                                activeCategory === cat
                                    ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25"
                                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Info */}
                <div className="flex items-center justify-between mb-8 px-2">
                    <p className="text-sm font-bold text-slate-500">
                        Showing <span className="text-slate-900 dark:text-white">{displayedItems.length}</span> of <span className="text-slate-900 dark:text-white">{filteredAndSortedItems.length}</span> results
                    </p>
                    <div className="flex items-center gap-2 text-slate-400">
                        <LucideLayoutGrid size={16} />
                        <span className="text-xs font-bold uppercase tracking-wider">Grid View</span>
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-[420px] bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 animate-pulse p-6">
                                <div className="bg-slate-100 dark:bg-slate-800 w-full aspect-square rounded-2xl mb-6" />
                                <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded-full w-2/3 mb-4" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-full mb-2" />
                                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : displayedItems.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {displayedItems.map((item, idx) => (
                                <div
                                    key={item.id}
                                    className="animate-in fade-in slide-in-from-bottom duration-500"
                                    style={{ animationDelay: `${idx * 50}ms` }}
                                >
                                    <ProductCard product={item} />
                                </div>
                            ))}
                        </div>

                        {/* Load More */}
                        {hasMore && (
                            <div className="mt-16 flex justify-center">
                                <button
                                    onClick={() => setDisplayCount(prev => prev + 4)}
                                    className="px-10 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:border-primary-600 hover:text-primary-600 transition-all active:scale-95 flex items-center gap-2 group"
                                >
                                    Load More Products
                                    <LucideChevronDown className="group-hover:translate-y-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-32 flex flex-col items-center justify-center text-center animate-in fade-in duration-500">
                        <div className="h-24 w-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-700 mb-6">
                            <LucideInbox size={48} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No products found</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="mt-8 text-primary-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
