"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { showSuccess, showError } from "@/lib/toast";
import {
    LucideSparkles,
    LucideMail,
    LucideLock,
    LucideEye,
    LucideEyeOff,
    LucideChrome,
    LucideLoader2,
    LucideArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const callbackUrl = searchParams.get("callbackUrl") || "/items";

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl,
            });

            if (result?.error) {
                showError("Invalid email or password. Please try again.");
            } else {
                showSuccess("Welcome back! Redirecting...");
                router.push(callbackUrl);
                router.refresh();
            }
        } catch {
            showError("Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        try {
            await signIn("google", { callbackUrl });
        } catch {
            showError("Failed to sign in with Google.");
            setIsGoogleLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20 p-6">
            {/* Animated blob background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-primary-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-125 h-125 bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700 ease-out relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 p-8 md:p-10 hover:shadow-primary-500/10 transition-shadow duration-500 animate-float">

                    {/* Logo & Header */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="h-12 w-12 rounded-2xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/50 group-hover:rotate-12 transition-transform duration-300">
                                <LucideSparkles size={28} />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-slate-900 via-primary-600 to-indigo-600 dark:from-white dark:via-primary-400 dark:to-indigo-400">
                            Welcome Back
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <button
                        type="button"
                        disabled={isGoogleLoading || isLoading}
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-750 transition-all shadow-sm hover:shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                        {isGoogleLoading ? (
                            <LucideLoader2 className="animate-spin" size={20} />
                        ) : (
                            <LucideChrome className="text-red-500" size={20} />
                        )}
                        Sign in with Google
                    </button>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold">
                            <span className="px-4 bg-transparent text-slate-400">Or email</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <LucideMail size={20} />
                                </div>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="name@example.com"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.email
                                            ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-bold text-primary-600 hover:text-primary-500 transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors">
                                    <LucideLock size={20} />
                                </div>
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all font-medium text-slate-900 dark:text-white",
                                        errors.password
                                            ? "border-red-500 focus:ring-4 focus:ring-red-500/10"
                                            : "border-slate-100 dark:border-slate-700 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10"
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                                >
                                    {showPassword ? <LucideEyeOff size={20} /> : <LucideEye size={20} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-500 text-xs font-bold mt-2 ml-2">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center ml-1">
                            <input
                                {...register("rememberMe")}
                                id="rememberMe"
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500 dark:bg-slate-800 dark:border-slate-700"
                            />
                            <label htmlFor="rememberMe" className="ml-2 text-sm font-bold text-slate-600 dark:text-slate-400 cursor-pointer">
                                Remember me
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || isGoogleLoading}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/25 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 group"
                        >
                            {isLoading ? (
                                <LucideLoader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In
                                    <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer Link */}
                    <p className="text-center mt-10 text-sm font-bold text-slate-500 dark:text-slate-400">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="text-primary-600 hover:text-primary-500 transition-colors underline-offset-4 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Footer copyright */}
            <p className="absolute bottom-6 text-sm font-bold text-slate-400 dark:text-slate-600">
                &copy; {new Date().getFullYear()} Custom Spark. All rights reserved.
            </p>

            {/* Adding custom floating animation */}
            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
