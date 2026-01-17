"use client";

import Image from "next/image";
import Link from "next/link";
import { LucideHeart, LucideEye, LucideShoppingBag } from "lucide-react";
import { Item } from "@/types";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { formatPrice } from "@/lib/format";

interface ProductCardProps {
    product: Item;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 flex flex-col h-full relative">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                        href={`/items/${product.id}`}
                        className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary-600 hover:text-white"
                        aria-label="View product details"
                    >
                        <LucideEye size={20} />
                    </Link>
                    <button
                        className="h-10 w-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-900 dark:text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 hover:bg-primary-600 hover:text-white"
                        aria-label="Add to cart"
                    >
                        <LucideShoppingBag size={20} />
                    </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary-600 shadow-sm">
                        {product.category}
                    </span>
                </div>

                {/* Wishlist Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setIsWishlisted(!isWishlisted);
                    }}
                    className={cn(
                        "absolute top-4 right-4 h-9 w-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all",
                        isWishlisted
                            ? "bg-red-500 text-white"
                            : "bg-white/90 dark:bg-slate-900/90 text-slate-400 hover:text-red-500"
                    )}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <LucideHeart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
            </div>

            {/* Content */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {product.shortDescription || product.description}
                    </p>
                    {product.user && (
                        <div className="flex items-center gap-2 mb-4">
                            {product.user.image ? (
                                <Image
                                    src={product.user.image}
                                    alt={product.user.name || "Seller"}
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                            ) : (
                                <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                    {product.user.name?.[0] || "S"}
                                </div>
                            )}
                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                                {product.user.name || "Verified Seller"}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Price</span>
                        <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-slate-900 dark:text-white">
                                {formatPrice(product.price)}
                            </span>
                            {product.stock <= 0 && (
                                <span className="text-[10px] font-bold text-red-500 uppercase">Out of Stock</span>
                            )}
                        </div>
                    </div>
                    <Link
                        href={`/items/${product.id}`}
                        className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold rounded-xl hover:bg-primary-600 hover:text-white transition-all active:scale-95"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
}
