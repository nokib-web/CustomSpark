import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/auth";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
            <div className="container mx-auto flex pt-20">
                <DashboardSidebar />
                <main className="flex-1 w-full overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
