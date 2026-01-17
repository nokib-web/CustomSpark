import { LucideSend, LucideTwitter, LucideInstagram, LucideFacebook, LucideLinkedin } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900 dark:bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden ring-1 ring-white/10">
                    {/* Background effects */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-600/10 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 blur-[100px] rounded-full animate-float" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
                            Join the Community
                        </div>
                        <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 tracking-tighter">
                            Ready to <span className="text-primary-500">Spark</span> Your Journey?
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                            Subscribe to our newsletter and get 15% off your first purchase, plus early access to our seasonal collections.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-3 mb-12">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-primary-500 focus:bg-white/10 transition-all"
                            />
                            <button className="px-10 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-primary-600/20 active:scale-95">
                                Subscribe <LucideSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>

                        <div className="flex justify-center gap-5">
                            {[LucideTwitter, LucideInstagram, LucideFacebook, LucideLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all group">
                                    <Icon size={20} className="group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
