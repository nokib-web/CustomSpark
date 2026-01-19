"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
    LucideUser,
    LucideMail,
    LucideCalendar,
    LucidePackage,
    LucideEdit3,
    LucideCamera,
    LucideLoader2,
    LucideChevronRight,
    LucideSparkles,
    LucideExternalLink,
    LucidePlusCircle
} from "lucide-react";
import { showSuccess, showError } from "@/lib/toast";

interface Item {
    id: string;
    name: string;
    price: number;
    category: string;
    imageUrl: string;
    createdAt: string;
}

interface UserProfile {
    id: string;
    name: string;
    email: string;
    image: string | null;
    createdAt: string;
    items: Item[];
}

export default function ProfilePage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/user/profile");
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                    setNewDisplayName(data.name || "");
                } else {
                    showError("Failed to load profile");
                }
            } catch (error) {
                console.error("Fetch profile error:", error);
                showError("Something went wrong");
            } finally {
                setIsLoading(false);
            }
        };

        if (session) {
            fetchProfile();
        }
    }, [session]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const res = await fetch("/api/user/profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newDisplayName }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setProfile(prev => prev ? { ...prev, name: updatedUser.name } : null);
                setIsEditing(false);
                showSuccess("Profile updated successfully");
            } else {
                showError("Failed to update profile");
            }
        } catch (error) {
            showError("Something went wrong");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <LucideLoader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Profile not found</h1>
                    <Link href="/" className="text-primary-600 hover:underline">Back to home</Link>
                </div>
            </div>
        );
    }

    return (
        <section className="py-12 px-6 lg:px-12 animate-in fade-in duration-700">
            <div className="max-w-5xl mx-auto">
                {/* Profile Header Card */}
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-10 overflow-hidden relative">
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500/5 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full" />

                    <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 p-1">
                                <div className="h-full w-full rounded-full bg-white dark:bg-slate-900 overflow-hidden relative">
                                    {profile.image ? (
                                        <Image
                                            src={profile.image}
                                            alt={profile.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                                            <LucideUser className="h-16 w-16 text-slate-300 dark:text-slate-600" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className="absolute bottom-1 right-1 h-10 w-10 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300">
                                <LucideCamera size={18} />
                            </button>
                        </div>

                        {/* Info Section */}
                        <div className="flex-1 space-y-6">
                            <div className="space-y-2">
                                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                    {isEditing ? (
                                        <form onSubmit={handleUpdateProfile} className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full">
                                            <input
                                                type="text"
                                                value={newDisplayName}
                                                onChange={(e) => setNewDisplayName(e.target.value)}
                                                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xl font-bold text-slate-900 dark:text-white outline-none focus:border-primary-500 w-full md:max-w-xs"
                                                autoFocus
                                            />
                                            <div className="flex gap-2 w-full md:w-auto">
                                                <button
                                                    type="submit"
                                                    disabled={isSaving}
                                                    className="bg-primary-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-500 disabled:opacity-50 transition-colors flex-1 md:flex-none"
                                                >
                                                    {isSaving ? "Saving..." : "Save"}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEditing(false)}
                                                    className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex-1 md:flex-none"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    ) : (
                                        <>
                                            <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
                                                {profile.name || "Anonymous User"}
                                            </h1>
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 transition-all self-center md:self-auto"
                                            >
                                                <LucideEdit3 size={16} /> Edit Profile
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium">
                                        <LucideMail size={16} /> {profile.email}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-medium border-l border-slate-200 dark:border-slate-700 pl-4">
                                        <LucideCalendar size={16} /> Joined {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            {/* Brief Stats */}
                            <div className="flex gap-4 md:gap-8 pt-4">
                                <div className="text-center md:text-left">
                                    <p className="text-2xl font-black text-primary-600">{profile.items.length}</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Items Listed</p>
                                </div>
                                <div className="text-center md:text-left border-l border-slate-200 dark:border-slate-800 pl-4 md:pl-8">
                                    <p className="text-2xl font-black text-indigo-600">0</p>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Orders</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Shortcut Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <Link href="/dashboard" className="group p-6 bg-gradient-to-br from-primary-600 to-indigo-700 rounded-[2rem] shadow-lg shadow-primary-500/20 flex items-center justify-between text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-white/10 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                <LucideSparkles className="animate-pulse" size={20} />
                                Seller Center
                            </h3>
                            <p className="text-white/80 text-sm font-medium">Manage your items and sales</p>
                        </div>
                        <LucideChevronRight className="relative z-10 h-8 w-8 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link href="/items/add" className="group p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between overflow-hidden relative hover:border-primary-500/50 transition-all">
                        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-32 h-32 bg-primary-500/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500" />
                        <div className="relative z-10 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                                <LucidePackage size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">List New Item</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Start selling more today</p>
                            </div>
                        </div>
                        <LucideChevronRight className="relative z-10 h-8 w-8 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Recent Items List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                            Recent Items
                            <span className="text-sm font-bold text-slate-400 ml-2 py-0.5 px-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                {profile.items.length}
                            </span>
                        </h2>
                        <Link href="/items" className="text-sm font-bold text-primary-600 hover:text-primary-500 flex items-center gap-1 group">
                            View all catalog <LucideChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </div>

                    {profile.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profile.items.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/items/${item.id}`}
                                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.src = "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&q=80";
                                            }}
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-200 border border-white/50 dark:border-slate-700/50">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start gap-4 mb-2">
                                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary-600 transition-colors line-clamp-1 italic">
                                                {item.name}
                                            </h3>
                                            <LucideExternalLink size={16} className="text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors shrink-0" />
                                        </div>
                                        <div className="mt-auto flex items-center justify-between">
                                            <p className="text-xl font-black text-slate-900 dark:text-white">${item.price.toFixed(2)}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Added {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center">
                            <div className="h-16 w-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 mx-auto mb-6">
                                <LucidePackage size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No items yet</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-xs mx-auto text-sm">You haven't listed any items for sale yet. Start your journey today!</p>
                            <Link
                                href="/items/add"
                                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-primary-500/20 transition-all active:scale-95"
                            >
                                <LucidePlusCircle size={20} /> List Your First Item
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
