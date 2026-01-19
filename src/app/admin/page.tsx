import prisma from "@/lib/prisma";
import { LucideUsers, LucidePackage, LucideTrendingUp, LucideSettings } from "lucide-react";
import Link from "next/link";
import PerformanceBars from "@/components/PerformanceBars";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    // Fetch some admin stats
    const [userCount, itemCount, featuredCount] = await Promise.all([
        prisma.user.count(),
        prisma.item.count(),
        prisma.item.count({ where: { featured: true } })
    ]);

    const stats = [
        { label: "Total Users", value: userCount, icon: LucideUsers, color: "text-blue-600", bg: "bg-blue-100 dark:bg-blue-900/30" },
        { label: "Active Listings", value: itemCount, icon: LucidePackage, color: "text-purple-600", bg: "bg-purple-100 dark:bg-purple-900/30" },
        { label: "Featured Items", value: featuredCount, icon: LucideTrendingUp, color: "text-emerald-600", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
    ];

    return (
        <section className="py-12 px-6 lg:px-12 animate-in fade-in duration-700">
            <div className="max-w-6xl">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Admin Administrator</h1>
                        <p className="text-slate-500 font-medium">Global platform overview and management.</p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                    >
                        Switch to User View
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="dashboard-card p-8 group">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`h-14 w-14 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                                    <stat.icon size={28} />
                                </div>
                                <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">{stat.label}</span>
                            </div>
                            <p className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 dashboard-card p-10">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black">System Performance</h2>
                            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <PerformanceBars />
                    </div>

                    <div className="bg-primary-600 rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <LucideSettings className="mb-6 opacity-50" size={40} />
                        <h2 className="text-2xl font-black mb-4">Platform Settings</h2>
                        <p className="text-primary-100 mb-8 font-medium">Configure global parameters and security protocols.</p>
                        <button className="w-full py-4 bg-white text-primary-600 font-bold rounded-2xl hover:bg-primary-50 transition-all active:scale-95 shadow-lg shadow-black/20">
                            Open Settings
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
