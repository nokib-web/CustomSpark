import Image from "next/image";
import { LucideStar, LucideQuote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "Digital Designer",
        content: "The quality of the products surpassed my expectations. The delivery was incredibly fast, and the customer service team was very helpful with my sizing questions.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Michael Chen",
        role: "Software Engineer",
        content: "I've been shopping here for months now. The attention to detail and curated selection makes it my go-to place for premium tech accessories.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=michael"
    },
    {
        name: "Elena Rodriguez",
        role: "Creative Director",
        content: "Finding authentic products online can be tricky, but Custom Spark has earned my complete trust. Their verification process is top-notch.",
        rating: 5,
        avatar: "https://i.pravatar.cc/150?u=elena"
    }
];

export default function TestimonialsSection() {
    return (
        <section className="py-24 bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Testimonials</h2>
                    <p className="text-4xl font-bold text-slate-900 dark:text-white mb-6">What Our Customers Say</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none relative">
                            <LucideQuote className="absolute top-6 right-8 text-primary-100 dark:text-slate-800 h-12 w-12 z-0" />
                            <div className="relative z-10">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(t.rating)].map((_, idx) => (
                                        <LucideStar key={idx} size={16} className="fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 dark:text-slate-400 italic mb-8 leading-relaxed">
                                    &quot;{t.content}&quot;
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-primary-500">
                                        <Image src={t.avatar} alt={t.name} width={48} height={48} className="object-cover" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900 dark:text-white">{t.name}</h5>
                                        <p className="text-xs text-slate-500">{t.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
