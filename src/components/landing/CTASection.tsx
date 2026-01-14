import { LucideSend, LucideTwitter, LucideInstagram, LucideFacebook, LucideLinkedin } from "lucide-react";

export default function CTASection() {
    return (
        <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <div className="container mx-auto px-6">
                <div className="bg-slate-900 dark:bg-slate-800 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 blur-[80px] rounded-full" />

                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Stay in the Spark Loop</h2>
                        <p className="text-slate-400 text-lg mb-10">
                            Subscribe to our newsletter and get 15% off your first purchase, plus early access to our seasonal collections.
                        </p>

                        <form className="flex flex-col sm:flex-row gap-4 mb-12">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-500 outline-none focus:border-primary-500 transition-all"
                            />
                            <button className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2 group">
                                Subscribe <LucideSend size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>

                        <div className="flex justify-center gap-6">
                            {[LucideTwitter, LucideInstagram, LucideFacebook, LucideLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary-600 hover:border-primary-600 transition-all">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
