"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import {
    LucidePackage,
    LucideTag,
    LucideDollarSign,
    LucideFileText,
    LucideImage,
    LucideLayers,
    LucideLoader2,
    LucidePlus,
    LucideX,
    LucideArrowLeft,
    LucideSave
} from "lucide-react";
import Link from "next/link";
import { ItemSchema } from "@/types/item";
import { cn } from "@/lib/utils";

interface AddItemFormValues {
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    stock: number;
    sku?: string;
    tags: string[];
}

const CATEGORIES = ["Electronics", "Fashion", "Home", "Sports", "Accessories"];

export default function AddItemPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<AddItemFormValues>({
        resolver: zodResolver(ItemSchema),
        defaultValues: {
            tags: [],
            stock: 0,
            price: 0,
        },
    });

    const imageUrl = watch("imageUrl");

    const onSubmit = async (data: AddItemFormValues) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/items", {
                method: "POST",
                body: JSON.stringify({ ...data, tags }),
                headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();

            if (res.ok) {
                toast.success("Product added successfully!");
                router.push(`/items/${result.id}`);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to add product");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                const newTags = [...tags, tagInput.trim()];
                setTags(newTags);
                setValue("tags", newTags);
            }
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter(t => t !== tagToRemove);
        setTags(newTags);
        setValue("tags", newTags);
    };

    const generateSKU = () => {
        const name = watch("name") || "PROD";
        const cat = watch("category") || "GEN";
        const random = Math.floor(1000 + Math.random() * 9000);
        const sku = `${cat.substring(0, 3).toUpperCase()}-${name.substring(0, 3).toUpperCase()}-${random}`;
        setValue("sku", sku);
    };

    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-24 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <Link href="/items" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-600 transition-colors mb-4">
                            <LucideArrowLeft size={16} />
                            Back to Products
                        </Link>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white">Add New <span className="text-primary-600">Product</span></h1>
                        <p className="text-slate-500 mt-2">Create a premium listing for your high-quality item.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    {/* Section 1: Basic Information */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                <LucidePackage size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Basic Information</h3>
                                <p className="text-sm text-slate-500">Essential product identifiers</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Product Name</label>
                                <input
                                    {...register("name")}
                                    placeholder="e.g. Premium Wireless Headphones"
                                    className={cn(
                                        "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-medium",
                                        errors.name ? "border-red-500 focus:ring-red-500/10 focus:ring-4" : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                                {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Category</label>
                                <div className="relative">
                                    <select
                                        {...register("category")}
                                        className={cn(
                                            "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-bold appearance-none cursor-pointer",
                                            errors.category ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                        )}
                                    >
                                        <option value="">Select Category</option>
                                        {CATEGORIES.map(cat => <option key={cat} value={cat.toLowerCase()}>{cat}</option>)}
                                    </select>
                                    <LucideTag className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                                </div>
                                {errors.category && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.category.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Price (USD)</label>
                                <div className="relative">
                                    <LucideDollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        {...register("price", { valueAsNumber: true })}
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        className={cn(
                                            "w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-black",
                                            errors.price ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                        )}
                                    />
                                </div>
                                {errors.price && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.price.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Description */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">
                                <LucideFileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Content & Story</h3>
                                <p className="text-sm text-slate-500">Tell us what makes this product special</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Short Catchy Description</label>
                                <input
                                    {...register("shortDescription")}
                                    placeholder="Summarize the value proposition in one sentence"
                                    className={cn(
                                        "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-medium",
                                        errors.shortDescription ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                                <p className="text-[10px] text-slate-400 mt-2 ml-2 font-bold uppercase tracking-widest">Max 150 characters</p>
                                {errors.shortDescription && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.shortDescription.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Full Detailed Description</label>
                                <textarea
                                    {...register("description")}
                                    rows={6}
                                    placeholder="Deep dive into features, materials, and benefits..."
                                    className={cn(
                                        "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-medium resize-none",
                                        errors.description ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                                {errors.description && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.description.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Visuals */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">
                                <LucideImage size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Visual Identity</h3>
                                <p className="text-sm text-slate-500">Add vibrant imagery for your product</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Main Image URL</label>
                                    <input
                                        {...register("imageUrl")}
                                        placeholder="https://images.unsplash.com/..."
                                        className={cn(
                                            "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-medium",
                                            errors.imageUrl ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                        )}
                                    />
                                    {errors.imageUrl && <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.imageUrl.message}</p>}
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed italic">
                                    Tip: High-quality square images (1:1 aspect ratio) work best for premium item displays.
                                </p>
                            </div>

                            <div className="aspect-square rounded-[2rem] overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center relative group">
                                {imageUrl && !errors.imageUrl ? (
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-slate-400 flex flex-col items-center gap-2">
                                        <LucideImage size={40} />
                                        <span className="font-bold text-xs uppercase tracking-widest">Image Preview</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Operational Data */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                <LucideLayers size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-black">Operational Details</h3>
                                <p className="text-sm text-slate-500">Inventory and categorization settings</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Stock Quantity</label>
                                <input
                                    {...register("stock", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="0"
                                    className={cn(
                                        "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border rounded-2xl outline-none transition-all font-black",
                                        errors.stock ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1 flex justify-between">
                                    SKU Code
                                    <button type="button" onClick={generateSKU} className="text-primary-600 text-[10px] uppercase font-black hover:underline tracking-widest">Auto-Generate</button>
                                </label>
                                <input
                                    {...register("sku")}
                                    placeholder="CATEGORY-NAME-RANDOM"
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none transition-all font-mono text-sm"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">Tags & Keywords</label>
                                <div className="p-2 min-h-[56px] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl flex flex-wrap gap-2 items-center">
                                    {tags.map(tag => (
                                        <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-600 text-white text-xs font-black rounded-xl">
                                            {tag}
                                            <button type="button" onClick={() => removeTag(tag)} className="hover:text-black transition-colors">
                                                <LucideX size={12} strokeWidth={4} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder={tags.length === 0 ? "Type and press Enter to add tags..." : "Add more..."}
                                        className="flex-1 bg-transparent outline-none px-4 text-sm font-medium min-w-[150px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-end pt-8">
                        <button
                            type="button"
                            className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 font-bold rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                        >
                            <LucideSave size={20} />
                            Save as Draft
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto px-12 py-4 bg-primary-600 hover:bg-primary-500 text-white font-black rounded-2xl shadow-2xl shadow-primary-500/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95 group"
                        >
                            {isLoading ? (
                                <LucideLoader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Publish Product
                                    <LucidePlus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
