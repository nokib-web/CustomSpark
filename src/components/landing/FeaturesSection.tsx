import { LucideTruck, LucideShieldCheck, LucideAward, LucideHeadphones } from "lucide-react";

const features = [
    {
        icon: LucideTruck,
        title: "Fast Delivery",
        desc: "Get your items delivered within 24-48 hours with our priority shipping.",
        color: "text-blue-600",
        bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
        icon: LucideAward,
        title: "Quality Products",
        desc: "Every product is verified for quality and authenticity by our expert team.",
        color: "text-purple-600",
        bg: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
        icon: LucideShieldCheck,
        title: "Secure Payments",
        desc: "State-of-the-art encryption ensures your financial data is always safe.",
        color: "text-green-600",
        bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
        icon: LucideHeadphones,
        title: "24/7 Support",
        desc: "Our dedicated support team is available around the clock to assist you.",
        color: "text-orange-600",
        bg: "bg-orange-100 dark:bg-orange-900/30",
    },
];

export default function FeaturesSection() {
    return (
        <section id="features" className="py-24 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Why Choose Us
                    </div>
                    <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                        Everything you need to <span className="text-gradient">shining</span>
                    </h2>
                    <p className="text-xl text-slate-600 dark:text-slate-400">
                        We focus on the details that matter most to our customers, ensuring a seamless and reliable experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-primary-500/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-500/5 blur-2xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />

                            <div className={`h-16 w-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-6`}>
                                <feature.icon className={`h-9 w-9 ${feature.color}`} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
