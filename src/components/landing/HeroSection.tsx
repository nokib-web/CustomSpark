import Link from "next/link";
import Image from "next/image";
import { LucideArrowRight, LucideRocket } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white dark:bg-slate-950">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full animate-float" />

            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-ping" />
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-ping [animation-delay:1s]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="text-left">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-bold mb-8 border border-primary-100 dark:border-primary-800/50 animate-in fade-in slide-in-from-top duration-700">
                            <LucideRocket size={16} />
                            <span>The future of commerce is here</span>
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8 tracking-tighter animate-in fade-in slide-in-from-left duration-1000">
                            Discover <span className="text-gradient">Amazing</span> Products
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-xl leading-relaxed animate-in fade-in slide-in-from-left duration-1000 delay-200">
                            Experience the next generation of online shopping. Handpicked quality items, blazing fast delivery, and a seamless checkout process tailored just for you.
                        </p>
                        <div className="flex flex-wrap gap-6 animate-in fade-in slide-in-from-up duration-1000 delay-400">
                            <Link
                                href="/items"
                                className="px-10 py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all shadow-2xl shadow-primary-500/40 flex items-center gap-3 group active:scale-95"
                            >
                                Browse Items
                                <LucideArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
                            </Link>
                            <Link
                                href="/login"
                                className="px-10 py-5 glass text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
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
