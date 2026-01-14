"use client";

import { useState } from "react";
import Link from "next/link";
import { LucideSparkles, LucideMail, LucideArrowRight, LucideCheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-6">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 dark:border-slate-800">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4">
                        <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center text-white">
                            <LucideSparkles size={24} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold">Reset Password</h1>
                    <p className="text-slate-500 mt-2 italic">No worries, we've got you covered.</p>
                </div>

                {!submitted ? (
                    <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 ml-1 mb-1">Email Address</label>
                            <div className="relative">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:border-primary-500"
                                />
                            </div>
                        </div>
                        <button className="w-full py-4 bg-primary-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2">
                            Send Instructions <LucideArrowRight size={20} />
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <LucideCheckCircle size={64} className="text-green-500 mx-auto mb-6" />
                        <h2 className="text-xl font-bold mb-2">Check your email</h2>
                        <p className="text-slate-500">We've sent a password reset link to your inbox.</p>
                    </div>
                )}

                <div className="text-center mt-8">
                    <Link href="/login" className="text-sm font-bold text-primary-600 hover:underline">Back to Login</Link>
                </div>
            </div>
        </div>
    );
}
