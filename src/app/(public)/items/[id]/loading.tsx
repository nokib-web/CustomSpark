import Skeleton from "@/components/Skeleton";

export default function ItemDetailLoading() {
    return (
        <div className="container mx-auto px-6 pt-24 pb-20">
            <Skeleton className="h-6 w-64 mb-10" />

            <div className="grid lg:grid-cols-2 gap-12 mb-20">
                <div className="space-y-6">
                    <Skeleton className="aspect-square rounded-[2.5rem]" />
                    <div className="grid grid-cols-4 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <Skeleton key={i} className="aspect-square rounded-2xl" />
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-12 w-full" />
                        <div className="flex gap-4">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-10 w-40 mt-4" />
                    </div>

                    <Skeleton className="h-32 w-full" />

                    <div className="space-y-4 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-6">
                            <Skeleton className="h-14 w-32 rounded-2xl" />
                            <Skeleton className="h-14 flex-1 rounded-2xl" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <Skeleton className="h-16 rounded-2xl" />
                            <Skeleton className="h-16 rounded-2xl" />
                            <Skeleton className="h-16 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
