"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    LucideStar,
    LucideHeart,
    LucideShare2,
    LucideMinus,
    LucidePlus,
    LucideShoppingBag,
    LucideShieldCheck,
    LucideTruck,
    LucideRotateCcw
} from "lucide-react";
import { Item } from "@/types";
import { cn } from "@/lib/utils";
import { formatPrice, formatStock } from "@/lib/format";

interface ProductDetailsViewProps {
    item: Item;
    relatedItems: Item[];
}

export default function ProductDetailsView({ item, relatedItems }: ProductDetailsViewProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [isWishlisted, setIsWishlisted] = useState(false);

    const incrementQty = () => setQuantity(prev => {
        if (item.stock && prev >= item.stock) return prev;
        return prev + 1;
    });

    const decrementQty = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

    const stockInfo = formatStock(item.stock);

    const tabs = [
        { id: "description", label: "Description" },
        { id: "specifications", label: "Specifications" },
        { id: "reviews", label: "Reviews" },
    ];

    return (
        <div className="animate-in fade-in duration-700">
            <div className="grid lg:grid-cols-2 gap-12 mb-20">
                {/* Left: Image Gallery */}
                <div className="space-y-6">
                    <div className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none group">
                        <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                className={cn(
                                    "h-12 w-12 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all",
                                    isWishlisted ? "bg-red-500 text-white" : "bg-white/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-red-500"
                                )}
                            >
                                <LucideHeart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                            <button
                                className="h-12 w-12 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md flex items-center justify-center text-slate-600 dark:text-slate-300 shadow-lg hover:text-primary-600 transition-all"
                                aria-label="Share product"
                            >
                                <LucideShare2 size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className={cn(
                                "aspect-square rounded-2xl overflow-hidden border-2 transition-all cursor-pointer hover:opacity-80 relative",
                                i === 0 ? "border-primary-600" : "border-slate-100 dark:border-slate-800"
                            )}>
                                <Image
                                    src={item.imageUrl}
                                    alt={`${item.name} thumbnail ${i}`}
                                    fill
                                    sizes="25vw"
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Product Info */}
                <div className="flex flex-col">
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                {item.category}
                            </span>
                            {item.tags && item.tags.map(tag => (
                                <span key={tag} className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
                            {item.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex gap-0.5 text-yellow-400">
                                {[...Array(5)].map((_, i) => <LucideStar key={i} size={18} fill="currentColor" />)}
                            </div>
                            <span className="text-sm font-bold text-slate-400">(128 Verified Reviews)</span>
                            <span className={cn("text-sm font-black flex items-center gap-1", stockInfo.color.split(' ')[0])}>
                                <div className={cn("h-2 w-2 rounded-full animate-pulse", stockInfo.color.split(' ')[0].replace('text-', 'bg-'))} />
                                {stockInfo.label}
                            </span>
                        </div>
                        <div className="text-4xl font-black text-slate-900 dark:text-white">
                            {formatPrice(item.price)}
                        </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                        {item.description}
                    </p>

                    {item.user && (
                        <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                            {item.user.image ? (
                                <Image
                                    src={item.user.image}
                                    alt={item.user.name || "Seller"}
                                    width={48}
                                    height={48}
                                    className="rounded-full shadow-md"
                                />
                            ) : (
                                <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 text-lg">
                                    {item.user.name?.[0] || "S"}
                                </div>
                            )}
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Listed by {item.user.name || "Verified Seller"}</h4>
                                <div className="text-xs text-slate-500 mt-1 flex gap-3">
                                    <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
                                    {new Date(item.updatedAt) > new Date(item.createdAt) && (
                                        <span>Updated {new Date(item.updatedAt).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-6 pt-8 border-t border-slate-100 dark:border-slate-800 mb-10">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl p-1 w-full sm:w-auto">
                                <button
                                    onClick={decrementQty}
                                    disabled={item.stock === 0}
                                    className="h-12 w-12 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
                                    aria-label="Decrease quantity"
                                >
                                    <LucideMinus size={20} />
                                </button>
                                <span className="w-12 text-center font-black text-lg" aria-live="polite">{quantity}</span>
                                <button
                                    onClick={incrementQty}
                                    disabled={item.stock === 0 || quantity >= item.stock}
                                    className="h-12 w-12 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50"
                                    aria-label="Increase quantity"
                                >
                                    <LucidePlus size={20} />
                                </button>
                            </div>
                            <button
                                disabled={item.stock === 0}
                                className="flex-1 w-full flex items-center justify-center gap-3 bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-[0.98] group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <LucideShoppingBag size={20} />
                                {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <LucideTruck className="text-primary-600" size={20} />
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Fast Delivery</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <LucideShieldCheck className="text-primary-600" size={20} />
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">2 Year Warranty</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                                <LucideRotateCcw className="text-primary-600" size={20} />
                                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">30-Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mb-20">
                <div className="flex border-b border-slate-100 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "px-8 py-4 text-sm font-black uppercase tracking-widest transition-all relative shrink-0",
                                activeTab === tab.id ? "text-primary-600" : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-1 bg-primary-600 rounded-t-full" />}
                        </button>
                    ))}
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                    {activeTab === "description" && (
                        <div className="prose dark:prose-invert max-w-none">
                            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.shortDescription}
                            </p>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                                {item.description}
                            </p>
                            <ul className="mt-8 space-y-4">
                                {["Premium materials and construction", "Designed for maximum durability", "Ergonomic interface for intuitive use", "Industry-leading energy efficiency"].map((feat, i) => (
                                    <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                                        <LucideCheck className="text-green-500" size={18} /> {feat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {activeTab === "specifications" && (
                        <div className="grid sm:grid-cols-2 gap-y-6 gap-x-12">
                            {[
                                ["Material", "Reinforced Polymer"], // Placeholder
                                ["Weight", "1.2 kg"], // Placeholder
                                ["Dimensions", "15 x 20 x 5 cm"], // Placeholder
                                ["Connectivity", "Bluetooth 5.2 / USB-C"], // Placeholder
                                ["Battery Life", "Up to 48 hours"], // Placeholder
                                ["Color", "Starry Night / Aurora Silver"], // Placeholder
                                ["SKU", item.sku || "N/A"],
                                ["Stock", item.stock.toString()]
                            ].map(([k, v], i) => (
                                <div key={i} className="flex justify-between items-center py-4 border-b border-slate-50 dark:border-slate-800/50">
                                    <span className="font-bold text-slate-400 uppercase text-xs tracking-widest">{k}</span>
                                    <span className="font-black text-slate-900 dark:text-white">{v}</span>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div className="text-center py-12">
                            <LucideStar className="mx-auto text-yellow-400 mb-4 animate-pulse" size={48} />
                            <h4 className="text-xl font-black mb-2">Customer Feedback</h4>
                            <p className="text-slate-500 max-w-sm mx-auto">See what our premium members are saying about their purchase.</p>
                            <button className="mt-8 px-8 py-3 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary-600 hover:text-white transition-all">Write a Review</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <section className="mb-20">
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Related <span className="text-primary-600">Treasures</span></h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedItems.slice(0, 4).map((rel) => (
                        <Link href={`/items/${rel.id}`} key={rel.id} className="group cursor-pointer">
                            <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800">
                                <Image
                                    src={rel.imageUrl}
                                    alt={rel.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">{rel.name}</h4>
                            <p className="text-lg font-black text-primary-600">{formatPrice(rel.price)}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

function LucideCheck({ className, size }: { className?: string; size?: number }) {
    return (
        <svg
            className={className}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}
