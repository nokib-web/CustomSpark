import { LucideCompass, LucideHome, LucideSearch } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6 py-24">
            <div className="max-w-2xl w-full text-center space-y-12">
                <div className="relative inline-block">
                    <h1 className="text-[12rem] font-black leading-none text-slate-200 dark:text-slate-900 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-40 w-40 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-primary-500/50 animate-bounce duration-[3000ms]">
                            <LucideCompass size={80} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-black text-slate-900 dark:text-white">You've reached a digital void.</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-md mx-auto leading-relaxed">
                        The page you're searching for has been moved or doesn't exist. Let's get you back on track.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-10 py-5 rounded-2xl font-black transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                    >
                        <LucideHome size={20} />
                        Back to Base
                    </Link>
                    <Link
                        href="/items"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-10 py-5 rounded-2xl font-black transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        <LucideSearch size={20} />
                        Browse Catalog
                    </Link>
                </div>

                <div className="pt-8 flex items-center justify-center gap-8 text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Support</span>
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Status</span>
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="hover:text-primary-600 cursor-pointer transition-colors">Sitemap</span>
                </div>
            </div>
        </div>
    );
}
