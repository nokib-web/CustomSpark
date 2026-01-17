export default function TermsPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-black mb-8">Terms of Service</h1>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 prose dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                        <p>By accessing or using Custom Spark, you agree to be bound by these Terms of Service.</p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">2. Use of Services</h2>
                        <p>You may use our services only in compliance with these Terms and all applicable laws.</p>
                    </section>
                    <p className="text-slate-400 mt-12 italic">This is a placeholder for the Custom Spark terms of service.</p>
                </div>
            </div>
        </main>
    );
}
