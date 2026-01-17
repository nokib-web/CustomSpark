"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
    LucideMenu,
    LucideX,
    LucideUser,
    LucideLayoutDashboard,
    LucidePlusCircle,
    LucideLogOut,
    LucideChevronDown,
    LucideSettings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "About", href: "/#about", isScroll: true },
    { name: "Contact", href: "/#contact", isScroll: true },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { data: session, status } = useSession();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menus when path changes
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpen(false);
        setIsDropdownOpen(false);
    }, [pathname]);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#") && pathname === "/") {
            e.preventDefault();
            const id = href.replace("/#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-500",
                isScrolled
                    ? "glass py-3 shadow-lg shadow-black/5"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-10 w-10 flex-shrink-0">
                            <Image
                                src="/favicon.png"
                                alt="Custom Spark Logo"
                                fill
                                sizes="40px"
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-gradient">
                            Custom Spark
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => link.isScroll && handleScrollClick(e, link.href)}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary-600",
                                    pathname === link.href
                                        ? "text-primary-600"
                                        : "text-slate-600 dark:text-slate-300"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {status === "loading" ? (
                            <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 p-1 pl-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
                                >
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                        {session.user?.name?.split(' ')[0]}
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">
                                        {session.user?.name?.[0] || <LucideUser size={16} />}
                                    </div>
                                    <LucideChevronDown className={cn("h-4 w-4 text-slate-500 transition-transform", isDropdownOpen && "rotate-180")} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 animate-in fade-in zoom-in duration-200">
                                        <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <LucideUser size={16} /> Profile
                                        </Link>
                                        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <LucideLayoutDashboard size={16} /> Dashboard
                                        </Link>
                                        {(session.user as any).role === "ADMIN" && (
                                            <Link href="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors font-bold">
                                                <LucideSettings size={16} /> Admin Center
                                            </Link>
                                        )}
                                        <Link href="/items/add" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                            <LucidePlusCircle size={16} /> Add Item
                                        </Link>
                                        <hr className="my-1 border-slate-200 dark:border-slate-800" />
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                        >
                                            <LucideLogOut size={16} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-500 transition-all shadow-md hover:shadow-primary-500/20 active:scale-95"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <LucideX size={24} /> : <LucideMenu size={24} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden pt-4 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => link.isScroll && handleScrollClick(e, link.href)}
                                className={cn(
                                    "block px-4 py-3 text-base font-medium rounded-lg transition-colors",
                                    pathname === link.href
                                        ? "bg-primary-50 dark:bg-primary-900/10 text-primary-600"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
                            {session ? (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3 px-4 mb-3">
                                        <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                                            {session.user?.name?.[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{session.user?.name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{session.user?.email}</p>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" className="block px-4 py-3 text-base font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                        Dashboard
                                    </Link>
                                    {(session.user as any).role === "ADMIN" && (
                                        <Link href="/admin" className="block px-4 py-3 text-base font-medium text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-lg transition-colors font-bold">
                                            Admin Center
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    className="w-full flex justify-center bg-primary-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-primary-500 transition-all shadow-md"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
