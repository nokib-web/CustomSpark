"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LucideLayoutDashboard,
    LucideUser,
    LucidePackage,
    LucidePlusCircle,
    LucideSettings,
    LucideLogOut,
    LucideChevronRight,
    LucideHome
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Overview", href: "/dashboard", icon: LucideLayoutDashboard },
    { name: "My Items", href: "/dashboard#items", icon: LucidePackage }, // Points to dashboard items section
    { name: "Profile", href: "/profile", icon: LucideUser },
    { name: "Add New Item", href: "/items/add", icon: LucidePlusCircle },
];

export default function DashboardSidebar() {
    const { data: session } = useSession();
    const pathname = usePathname();

    const isAdmin = session?.user?.role === "ADMIN";

    return (
        <aside className="w-72 hidden lg:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 h-[calc(100vh-80px)] sticky top-20 transition-all overflow-y-auto custom-scrollbar">
            <div className="p-6 flex-1 flex flex-col gap-8">
                {/* Main Navigation */}
                <div className="space-y-1">
                    <p className="px-4 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-600 mb-4">
                        Main Palette
                    </p>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center justify-between px-4 py-3 rounded-2xl transition-all group",
                                    isActive
                                        ? "bg-primary-50 dark:bg-primary-900/10 text-primary-600"
                                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "p-2 rounded-xl transition-all",
                                        isActive
                                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-primary-600"
                                    )}>
                                        <Icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold">{item.name}</span>
                                </div>
                                {isActive && <LucideChevronRight size={14} className="animate-in slide-in-from-left-2 duration-300" />}
                            </Link>
                        );
                    })}
                </div>

                {/* Admin Support */}
                {isAdmin && (
                    <div className="space-y-1 pt-6 border-t border-slate-100 dark:border-slate-800">
                        <p className="px-4 text-[10px] font-black uppercase tracking-widest text-amber-500 mb-4">
                            Administration
                        </p>
                        <Link
                            href="/admin"
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all group",
                                pathname.startsWith("/admin")
                                    ? "bg-amber-50 dark:bg-amber-900/10 text-amber-600"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 hover:text-amber-600"
                            )}
                        >
                            <div className={cn(
                                "p-2 rounded-xl transition-all",
                                pathname.startsWith("/admin")
                                    ? "bg-amber-500 text-white shadow-lg shadow-amber-500/20"
                                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-amber-600"
                            )}>
                                <LucideSettings size={18} />
                            </div>
                            <span className="text-sm font-bold">Admin Center</span>
                        </Link>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-bold text-sm"
                >
                    <LucideHome size={18} /> Back to Store
                </Link>
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all font-bold text-sm"
                >
                    <LucideLogOut size={18} /> Logout
                </button>
            </div>
        </aside>
    );
}
