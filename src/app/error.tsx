"use client";

import { useEffect } from "react";
import { LucideAlertCircle, LucideRefreshCcw, LucideHome } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-24 bg-slate-50 dark:bg-slate-950">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="h-24 w-24 bg-red-100 dark:bg-red-900/30 rounded-3xl flex items-center justify-center text-red-600 mx-auto">
                    <LucideAlertCircle size={48} />
                </div>

                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Systems Critical</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Something went wrong while processing this page. Our team has been notified.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => reset()}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                    >
                        <LucideRefreshCcw size={20} />
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 py-4 rounded-2xl font-black transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <LucideHome size={20} />
                        Go Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
