import Link from "next/link";
import {
    LucideSparkles,
    LucideTwitter,
    LucideInstagram,
    LucideFacebook,
    LucideLinkedin,
    LucideSend
} from "lucide-react";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
];

const categories = [
    { name: "Electronics", href: "/items?category=electronics" },
    { name: "Fashion", href: "/items?category=fashion" },
    { name: "Home", href: "/items?category=home" },
    { name: "Sports", href: "/items?category=sports" },
];

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800 text-slate-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 font-bold text-2xl text-white">
                            <LucideSparkles className="h-7 w-7 text-primary-500" />
                            <span>Custom Spark</span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Empowering your digital experience with premium products and seamless services. Join the spark and discover greatness.
                        </p>
                        <div className="flex gap-4">
                            {[LucideTwitter, LucideInstagram, LucideFacebook, LucideLinkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white transition-all shadow-sm"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-primary-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Categories */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Categories</h4>
                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li key={category.name}>
                                    <Link
                                        href={category.href}
                                        className="text-sm hover:text-primary-500 transition-colors flex items-center gap-2 group"
                                    >
                                        <span className="h-1 w-1 rounded-full bg-slate-700 group-hover:bg-primary-500 transition-colors" />
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Newsletter</h4>
                        <p className="text-sm text-slate-400 mb-6">
                            Subscribe to get the latest updates on new products and special offers.
                        </p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-colors text-white"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1.5 h-9 w-9 bg-primary-600 hover:bg-primary-500 rounded-lg flex items-center justify-center text-white transition-colors"
                            >
                                <LucideSend size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500">
                        &copy; {new Date().getFullYear()} Custom Spark. Made with spark in Innovation City.
                    </p>
                    <div className="flex gap-8 text-sm">
                        <Link href="/privacy" className="text-slate-500 hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
