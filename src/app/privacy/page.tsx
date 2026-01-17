export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <h1 className="text-4xl font-black mb-8">Privacy Policy</h1>
                <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 shadow-sm border border-slate-100 dark:border-slate-800 prose dark:prose-invert max-w-none">
                    <p className="text-lg text-slate-500 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.</p>
                    </section>
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, and to process your transactions.</p>
                    </section>
                    <p className="text-slate-400 mt-12 italic">This is a placeholder for the Custom Spark privacy policy.</p>
                </div>
            </div>
        </main>
    );
}
