import { getServerSession } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Ensures the current user is an admin.
 * If not authenticated, redirects to login.
 * If authenticated but not admin, redirects to home or 403 page (here simply home).
 */
export async function requireAdmin() {
    const session = await getServerSession();

    if (!session || !session.user) {
        redirect("/login?callbackUrl=/admin");
    }

    if ((session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    return session;
}
