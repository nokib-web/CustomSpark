import Skeleton from "@/components/Skeleton";

export default function ItemsLoading() {
    return (
        <div className="container mx-auto px-6 pt-24 pb-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
                <div className="space-y-4">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-4 w-96" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-14 w-80 rounded-2xl" />
                    <Skeleton className="h-14 w-48 rounded-2xl" />
                </div>
            </div>

            <div className="flex gap-3 mb-12 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <Skeleton key={i} className="h-10 w-24 rounded-full flex-shrink-0" />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square rounded-[2rem]" />
                        <Skeleton className="h-6 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}
