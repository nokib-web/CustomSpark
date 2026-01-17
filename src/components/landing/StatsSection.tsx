const stats = [
    { label: "Happy Customers", value: "25k+", color: "from-blue-600 to-cyan-500" },
    { label: "Products Sold", value: "150k+", color: "from-purple-600 to-pink-500" },
    { label: "Categories", value: "40+", color: "from-orange-600 to-yellow-500" },
    { label: "Countries", value: "85+", color: "from-green-600 to-emerald-500" },
];

export default function StatsSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background elements */}
            <div className="absolute inset-0 bg-primary-600/10" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center group p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500">
                            <div className="text-5xl lg:text-6xl font-black text-white mb-3 tracking-tighter group-hover:scale-110 transition-transform">
                                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                                    {stat.value}
                                </span>
                            </div>
                            <div className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
