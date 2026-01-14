import { LucideLoader2 } from "lucide-react";

export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
            <div className="flex flex-col items-center gap-4">
                <LucideLoader2 className="h-12 w-12 animate-spin text-primary-600" />
                <p className="text-sm font-black uppercase tracking-[0.3em] text-slate-500 animate-pulse">
                    Custom Spark
                </p>
            </div>
        </div>
    );
}
