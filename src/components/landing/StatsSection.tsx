const stats = [
    { label: "Happy Customers", value: "25k+", color: "from-blue-600 to-cyan-500" },
    { label: "Products Sold", value: "150k+", color: "from-purple-600 to-pink-500" },
    { label: "Categories", value: "40+", color: "from-orange-600 to-yellow-500" },
    { label: "Countries", value: "85+", color: "from-green-600 to-emerald-500" },
];

export default function StatsSection() {
    return (
        <section className="py-20 bg-primary-600 relative overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group">
                            <div className="text-4xl lg:text-5xl font-black text-white mb-2 transform group-hover:scale-110 transition-transform">
                                {stat.value}
                            </div>
                            <div className="text-white/80 font-medium uppercase tracking-widest text-xs">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
