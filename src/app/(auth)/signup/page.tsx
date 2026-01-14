"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { showSuccess, showError } from "@/lib/toast";
import {
    LucideSparkles,
    LucideMail,
    LucideLock,
    LucideUser,
    LucideEye,
    LucideEyeOff,
    LucideLoader2,
    LucideArrowRight,
    LucideCheck,
    LucideX,
    LucideChrome
} from "lucide-react";
import { cn } from "@/lib/utils";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain at least one uppercase letter")
        .regex(/[0-9]/, "Must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            terms: false,
        }
    });

    const passwordValue = watch("password", "");

    useEffect(() => {
        let strength = 0;
        if (passwordValue.length >= 8) strength++;
        if (/[A-Z]/.test(passwordValue)) strength++;
        if (/[0-9]/.test(passwordValue)) strength++;
        if (/[^A-Za-z0-9]/.test(passwordValue)) strength++;
        setPasswordStrength(strength);
    }, [passwordValue]);

    const onSubmit = async (data: SignupFormValues) => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
                headers: { "Content-Type": "application/json" },
            });

            const result = await res.json();

            if (res.ok) {
                showSuccess("Account created! Redirecting to login...");
                setTimeout(() => router.push("/login"), 2000);
            } else {
                showError(result.error || "Registration failed");
            }
        } catch (error) {
            showError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn("google", { callbackUrl: "/items" });
        } catch (error) {
            showError("Failed to sign in with Google.");
            setIsGoogleLoading(false);
        }
    };

    const PasswordRequirement = ({ met, text }: { met: boolean; text: string }) => (
        <div className={cn("flex items-center gap-2 text-xs font-semibold transition-colors", met ? "text-green-500" : "text-slate-400")}>
            {met ? <LucideCheck size={12} strokeWidth={4} /> : <LucideX size={12} strokeWidth={4} />}
            {text}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20 p-6">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full animate-pulse" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700 relative z-10 my-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 p-8 md:p-10 animate-float">

                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="h-12 w-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/50 group-hover:rotate-12 transition-transform duration-300">
                                <LucideSparkles size={28} />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-primary-600 to-indigo-600 dark:from-white dark:via-primary-400 dark:to-indigo-400">
                            Create Account
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Join Custom Spark today</p>
                    </div>

                    <button
                        type="button"
                        disabled={isGoogleLoading || isLoading}
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98] disabled:opacity-50"
                    >
                        {isGoogleLoading ? <LucideLoader2 className="animate-spin" size={20} /> : <LucideChrome className="text-red-500" size={20} />}
                        Sign up with Google
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold font-bold"><span className="px-4 bg-transparent text-slate-400">Or email</span></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Full Name</label>
                            <div className="relative group">
                                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    {...register("name")}
                                    placeholder="John Doe"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.name ? "border-red-500 focus:ring-red-500/10 focus:ring-4" : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-wider">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Email</label>
                            <div className="relative group">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    {...register("email")}
                                    placeholder="name@example.com"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.email ? "border-red-500 focus:ring-red-500/10 focus:ring-4" : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-wider">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Password</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.password ? "border-red-500 focus:ring-red-500/10 focus:ring-4" : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                                    {showPassword ? <LucideEyeOff size={18} /> : <LucideEye size={18} />}
                                </button>
                            </div>

                            {/* Strength Indicator */}
                            <div className="px-2 pt-1">
                                <div className="flex gap-2 mb-2">
                                    {[...Array(4)].map((_, i) => (
                                        <div
                                            key={i}
                                            className={cn(
                                                "h-1.5 flex-1 rounded-full transition-all duration-500",
                                                i < passwordStrength
                                                    ? passwordStrength <= 2 ? "bg-orange-500" : "bg-green-500"
                                                    : "bg-slate-200 dark:bg-slate-800"
                                            )}
                                        />
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                    <PasswordRequirement met={passwordValue.length >= 8} text="8+ characters" />
                                    <PasswordRequirement met={/[A-Z]/.test(passwordValue)} text="Uppercase letter" />
                                    <PasswordRequirement met={/[0-9]/.test(passwordValue)} text="Includes number" />
                                    <PasswordRequirement met={/[^A-Za-z0-9]/.test(passwordValue)} text="Special character" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5 group-focus-within:text-primary-600 transition-colors" />
                                <input
                                    {...register("confirmPassword")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.confirmPassword ? "border-red-500 focus:ring-red-500/10 focus:ring-4" : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase tracking-wider">{errors.confirmPassword.message}</p>}
                        </div>

                        <div className="flex items-center gap-2 ml-1 py-1">
                            <input
                                {...register("terms")}
                                type="checkbox"
                                id="terms"
                                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                            />
                            <label htmlFor="terms" className="text-xs font-bold text-slate-600 dark:text-slate-400 cursor-pointer">
                                I agree to the <Link href="/terms" className="text-primary-600 hover:underline">Terms & Conditions</Link>
                            </label>
                        </div>
                        {errors.terms && <p className="text-red-500 text-[10px] font-bold ml-2 uppercase tracking-wider">{errors.terms.message}</p>}

                        <button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/25 transition-all flex items-center justify-center gap-2 group mt-4 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? <LucideLoader2 className="animate-spin" size={20} /> : <>Create Account <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="text-center mt-10 text-sm font-bold text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary-600 hover:underline underline-offset-4 decoration-2">Log in</Link>
                    </p>
                </div>
            </div>
            <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
        </div>
    );
}
