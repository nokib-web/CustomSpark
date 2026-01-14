"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-hot-toast";
import {
    LucideSparkles,
    LucideMail,
    LucideLock,
    LucideUser,
    LucideEye,
    LucideEyeOff,
    LucideLoader2,
    LucideArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormValues) => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success("Account created successfully! Please log in.");
            setIsLoading(false);
            router.push("/login");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-primary-950/20 p-6">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full animate-pulse" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700 relative z-10">
                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 p-8 md:p-10 animate-float">

                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4 group">
                            <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                <LucideSparkles size={24} />
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Create Account</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2">Join Custom Spark today</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Full Name</label>
                            <div className="relative group">
                                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    {...register("name")}
                                    placeholder="John Doe"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all",
                                        errors.name ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                            </div>
                            {errors.name && <p className="text-red-500 text-xs mt-1 ml-2">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Email</label>
                            <div className="relative group">
                                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    {...register("email")}
                                    placeholder="name@example.com"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all",
                                        errors.email ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Password</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all",
                                        errors.password ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    {showPassword ? <LucideEyeOff size={18} /> : <LucideEye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <LucideLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                                <input
                                    {...register("confirmPassword")}
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border rounded-2xl outline-none transition-all",
                                        errors.confirmPassword ? "border-red-500" : "border-slate-100 dark:border-slate-700 focus:border-primary-500"
                                    )}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 ml-2">{errors.confirmPassword.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl shadow-xl shadow-primary-500/25 transition-all flex items-center justify-center gap-2 group mt-4"
                        >
                            {isLoading ? <LucideLoader2 className="animate-spin" size={20} /> : <>Sign Up <LucideArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm font-bold text-slate-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary-600 hover:underline underline-offset-4">Log in</Link>
                    </p>
                </div>
            </div>
            <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
        </div>
    );
}
