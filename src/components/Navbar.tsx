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
                        <div className="relative h-10 w-10 shrink-0">
                            <Image
                                src="/favicon.png"
                                alt="Custom Spark Logo"
                                fill
                                sizes="40px"
                                className="object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-primary-400/20 blur-xl rounded-full scale-150 group-hover:scale-200 transition-transform" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                            Custom<span className="text-primary-600">Spark</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => link.isScroll && handleScrollClick(e, link.href)}
                                className={cn(
                                    "px-4 py-2 text-sm font-bold transition-all rounded-full hover:bg-slate-100 dark:hover:bg-slate-800",
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
                            <div className="h-10 w-40 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse" />
                        ) : session ? (
                            <div className="relative">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex items-center gap-2 p-1.5 pl-4 bg-white dark:bg-slate-900 rounded-full hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800 shadow-sm"
                                >
                                    <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                                        {session.user?.name?.split(' ')[0]}
                                    </span>
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-primary-500/20">
                                        {session.user?.name?.[0] || <LucideUser size={16} />}
                                    </div>
                                    <LucideChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", isDropdownOpen && "rotate-180")} />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 rounded-[1.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 py-3 animate-in fade-in zoom-in slide-in-from-top-2 duration-300 z-[100]">
                                        <div className="px-4 py-2 border-b border-slate-50 dark:border-slate-800 mb-2">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Account</p>
                                        </div>
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                            <LucideUser size={18} /> Profile
                                        </Link>
                                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                            <LucideLayoutDashboard size={18} /> Dashboard
                                        </Link>
                                        {session.user.role === "ADMIN" && (
                                            <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 text-sm font-black text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors">
                                                <LucideSettings size={18} /> Admin Center
                                            </Link>
                                        )}
                                        <Link href="/items/add" className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-primary-600 transition-colors">
                                            <LucidePlusCircle size={18} /> Add Item
                                        </Link>
                                        <div className="mx-2 my-2 border-t border-slate-50 dark:border-slate-800" />
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                        >
                                            <LucideLogOut size={18} /> Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-primary-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary-500 transition-all shadow-xl shadow-primary-500/20 active:scale-95"
                                >
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl transition-all active:scale-90"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <LucideX size={22} /> : <LucideMenu size={22} />}
                    </button>
                </div>

                {/* Mobile menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl p-4 space-y-2 animate-in slide-in-from-top-5 fade-in duration-300 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 blur-3xl rounded-full" />

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => link.isScroll && handleScrollClick(e, link.href)}
                                className={cn(
                                    "block px-5 py-3.5 text-base font-bold rounded-2xl transition-all",
                                    pathname === link.href
                                        ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20"
                                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <div className="pt-2 mt-2 border-t border-slate-50 dark:border-slate-800">
                            {session ? (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-4 px-4 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-2">
                                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg">
                                            {session.user?.name?.[0]}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-black text-slate-900 dark:text-white truncate">{session.user?.name}</p>
                                            <p className="text-[10px] font-bold text-slate-400 truncate uppercase tracking-widest">{session.user?.role}</p>
                                        </div>
                                    </div>
                                    <Link href="/dashboard" className="flex items-center gap-3 px-5 py-3.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl">
                                        <LucideLayoutDashboard size={20} /> Dashboard
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-3 px-5 py-3.5 text-base font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl">
                                        <LucideUser size={20} /> My Profile
                                    </Link>
                                    {session.user.role === "ADMIN" && (
                                        <Link href="/admin" className="flex items-center gap-3 px-5 py-3.5 text-base font-black text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/10 rounded-2xl">
                                            <LucideSettings size={20} /> Admin Center
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center gap-3 px-5 py-3.5 text-base font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl text-left"
                                    >
                                        <LucideLogOut size={20} /> Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 p-2">
                                    <Link
                                        href="/login"
                                        className="flex justify-center items-center h-12 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl text-sm font-black uppercase tracking-widest transition-all"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="flex justify-center items-center h-12 bg-primary-600 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
                                    >
                                        Join
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
