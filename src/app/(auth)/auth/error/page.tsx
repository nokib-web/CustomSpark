"use client";

import Link from "next/link";
import { LucideAlertCircle } from "lucide-react";

export default function AuthErrorPage() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800 text-center">
                <LucideAlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Authentication Error</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Something went wrong during the authentication process. Please try again.
                </p>
                <Link
                    href="/login"
                    className="inline-block px-6 py-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold rounded-lg shadow-md transition-all active:scale-95"
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
