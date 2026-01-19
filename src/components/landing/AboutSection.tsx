import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="about" className="py-24 bg-slate-50 dark:bg-slate-950 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 relative">
                        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] lg:aspect-[4/5]">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
                                alt="Our Team Meeting"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Geometric accents */}
                        <div className="absolute top-10 right-10 w-full h-full border-2 border-primary-600 rounded-3xl z-0 translate-x-4 translate-y-4 opacity-20" />
                    </div>

                    <div className="lg:w-1/2">
                        <h2 className="text-primary-600 font-bold tracking-wider uppercase text-sm mb-3">Our Story</h2>
                        <h3 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Built on Trust and Quality</h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                            Founded in 2024, Custom Spark started with a simple mission: to bridge the gap between premium artisans and discerning customers worldwide. We believe that everyone deserves access to high-quality, authentic products that tell a story.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                            Our values are rooted in transparency, sustainability, and exceptional service. Every item in our catalog is hand-selected and rigorously tested to meet our exacting standards.
                        </p>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">100% Quality</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">We never compromise on the materials or craftsmanship of our partners.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Customer First</h4>
                                <p className="text-slate-600 dark:text-slate-400 text-sm">Our world-class support is always ready to go the extra mile for you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
