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
        <section id="features" className="py-24 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Core Features</h2>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Everything you need to ship faster</p>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        We focus on the details that matter most to our customers, ensuring a seamless and reliable experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div key={idx} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all group">
                            <div className={`h-14 w-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <feature.icon className={`h-8 w-8 ${feature.color}`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
