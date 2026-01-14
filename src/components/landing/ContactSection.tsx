import { LucideMail, LucidePhone, LucideMapPin, LucideSend } from "lucide-react";

export default function ContactSection() {
    return (
        <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="animate-in fade-in slide-in-from-left duration-700">
                        <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Get in Touch</h2>
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Let's Start a Conversation</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                            Have a question about a product or interested in partnership? We'd love to hear from you.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 group">
                                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-primary-600 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
                                    <LucideMail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Email Us</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">hello@customspark.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-primary-600 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
                                    <LucidePhone size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Call Us</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">+1 (555) 000-0000</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6 group">
                                <div className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center text-primary-600 border border-slate-100 dark:border-slate-800 transition-transform group-hover:scale-110">
                                    <LucideMapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500 font-medium">Visit Us</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">123 Spark Way, Innovation City, NY</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-right duration-700">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help?"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-primary-600/20 focus:border-primary-600 transition-all text-slate-900 dark:text-white resize-none"
                                />
                            </div>
                            <button className="w-full py-5 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-primary-500/25 flex items-center justify-center gap-2 group">
                                Send Message <LucideSend size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
