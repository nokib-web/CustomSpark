import Link from "next/link";
import Image from "next/image";
import { LucideArrowRight, LucideRocket } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary-500/10 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left animate-in fade-in slide-in-from-left duration-1000">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm font-semibold mb-6">
                            <LucideRocket size={16} />
                            <span>The future of commerce is here</span>
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
                            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">Amazing</span> Products
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl leading-relaxed">
                            Experience the next generation of online shopping. Handpicked quality items, blazing fast delivery, and a seamless checkout process tailored just for you.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/items"
                                className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold transition-all shadow-lg shadow-primary-500/25 flex items-center gap-2 group"
                            >
                                Browse Items
                                <LucideArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </Link>
                            <Link
                                href="/login"
                                className="px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-full font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="relative animate-in fade-in slide-in-from-right duration-1000">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white/10 backdrop-blur-sm aspect-square">
                            <Image
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"
                                alt="Premium Product Showcase"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                        {/* Absolute badge */}
                        <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl z-20 border border-slate-100 dark:border-slate-800 hidden md:block">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                                    <span className="font-bold">4.9</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Customer Satisfaction</p>
                                    <p className="text-xs text-slate-500">Based on 10k+ reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
