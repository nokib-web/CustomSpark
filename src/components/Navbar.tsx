import Link from "next/link";
import { LucideSparkles } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="border-b bg-white dark:bg-slate-900 sticky top-0 z-50">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
                    <LucideSparkles className="h-6 w-6" />
                    <span>Custom Spark</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="text-sm font-medium hover:text-primary-600 transition-colors">
                        Login
                    </Link>
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-500 transition-all">
                        Get Started
                    </button>
                </div>
            </div>
        </nav>
    );
}
