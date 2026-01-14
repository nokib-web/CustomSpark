"use client";

import { LucideShieldAlert, LucideArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ItemDetailError() {
    return (
        <div className="container mx-auto px-6 py-32 text-center">
            <div className="h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-[2rem] flex items-center justify-center text-red-600 mx-auto mb-8">
                <LucideShieldAlert size={48} />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Product Not Reachable</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-10 text-lg font-medium leading-relaxed">
                The detailed information for this treasure is currently unavailable. Please check back shortly or explore our other collections.
            </p>
            <Link
                href="/items"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-black transition-all hover:opacity-80 shadow-2xl"
            >
                <LucideArrowLeft size={20} />
                Back to Catalog
            </Link>
        </div>
    );
}
