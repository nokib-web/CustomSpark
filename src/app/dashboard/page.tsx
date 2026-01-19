"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { Item } from "@/types";
import { LucidePlus, LucidePackage, LucideEdit, LucideTrash2, LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { showError, showSuccess } from "@/lib/toast";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const [userItems, setUserItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

    const fetchUserItems = useCallback(async () => {
        if (!session?.user) return;
        setIsLoading(true);
        try {
            const res = await fetch(`/api/user/items`);
            const data = await res.json();

            if (data.items) {
                setUserItems(data.items);
            }
        } catch (error) {
            console.error("Failed to load user items", error);
            showError("Failed to load your items.");
        } finally {
            setIsLoading(false);
        }
    }, [session]);

    useEffect(() => {
        if (status === "authenticated") {
            fetchUserItems();
        }
    }, [status, fetchUserItems]);

    const handleDelete = async (itemId: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;

        setDeleteLoading(itemId);
        try {
            const res = await fetch(`/api/items/${itemId}`, {
                method: "DELETE"
            });

            if (res.ok) {
                showSuccess("Item deleted successfully");
                setUserItems(prev => prev.filter(item => item.id !== itemId));
            } else {
                const data = await res.json();
                showError(data.error || "Failed to delete item");
            }
        } catch (error) {
            console.error("Failed to delete item:", error);
            showError("An error occurred while deleting the item.");
        } finally {
            setDeleteLoading(null);
        }
    };

    if (status === "loading" || isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LucideLoader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    if (!session) {
        return null; // Should redirect via middleware
    }

    return (
        <section className="py-12 px-6 lg:px-12 animate-in fade-in duration-700">
            <div className="max-w-6xl">
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white">My Dashboard</h1>
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                                session?.user?.role === "ADMIN"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                            )}>
                                {session?.user?.role || "User"}
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium">Manage your listings and account.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {session?.user?.role === "ADMIN" && (
                            <Link
                                href="/admin"
                                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold rounded-2xl transition-all flex items-center gap-2 active:scale-95"
                            >
                                Admin Center
                            </Link>
                        )}
                        <Link
                            href="/items/add"
                            className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-lg shadow-primary-500/25 transition-all flex items-center gap-2 active:scale-95"
                        >
                            <LucidePlus size={20} />
                            Add New Item
                        </Link>
                    </div>
                </div>

                {/* Stats Section (Placeholder) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="dashboard-card p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                <LucidePackage size={24} />
                            </div>
                            <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total Items</span>
                        </div>
                        <p className="text-4xl font-black text-slate-900 dark:text-white">{userItems.length}</p>
                    </div>
                    {/* Add more stats as needed */}
                </div>

                <div className="dashboard-card p-8 md:p-12 mb-12">
                    <h2 className="text-2xl font-black mb-8">My Items</h2>

                    {userItems.length > 0 ? (
                        <div className="grid gap-6">
                            {userItems.map(item => (
                                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                                    <div className="relative h-24 w-24 rounded-xl overflow-hidden shrink-0 bg-white">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 text-center md:text-left">
                                        <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{item.name}</h3>
                                        <p className="text-sm text-slate-500 capitalize">{item.category} • ${item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/items/${item.id}`}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-primary-600 transition-colors"
                                            title="View"
                                        >
                                            <LucidePackage size={18} />
                                        </Link>
                                        <button
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-amber-600 transition-colors cursor-not-allowed opacity-50"
                                            title="Edit (Coming Soon)"
                                            disabled // Add edit page later
                                        >
                                            <LucideEdit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            disabled={deleteLoading === item.id}
                                            className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-red-600 transition-colors disabled:opacity-50"
                                            title="Delete"
                                        >
                                            {deleteLoading === item.id ? <LucideLoader2 className="animate-spin" size={18} /> : <LucideTrash2 size={18} />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-slate-500 font-medium mb-6">You haven&apos;t listed any items yet.</p>
                            <Link href="/items/add" className="text-primary-600 font-bold hover:underline">Start selling today</Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
