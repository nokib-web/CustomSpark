"use client";

import { LucidePackageSearch, LucideRefreshCcw } from "lucide-react";

export default function ItemsError({
    reset,
}: {
    reset: () => void;
}) {
    return (
        <div className="container mx-auto px-6 py-32 text-center border-2 border-dashed border-red-100 dark:border-red-900/30 rounded-[3rem]">
            <div className="h-20 w-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600 mx-auto mb-6">
                <LucidePackageSearch size={40} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Catalog Sync Failed</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-8 font-medium">
                We couldn&apos;t retrieve the product list. This might be a temporary connection issue.
            </p>
            <button
                onClick={() => reset()}
                className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-8 py-3 rounded-2xl font-black transition-all shadow-lg shadow-primary-500/20"
            >
                <LucideRefreshCcw size={18} />
                Retry Feed
            </button>
        </div>
    );
}
