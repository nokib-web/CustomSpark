import { requireAdmin } from "@/lib/admin-guard";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

// Server Action to delete a user
async function deleteUser(userId: string) {
    "use server";
    try {
        await requireAdmin(); // Double check
        await prisma.item.deleteMany({ where: { userId } }); // Cascade manually if needed
        await prisma.user.delete({ where: { id: userId } });
        revalidatePath("/admin");
    } catch (error) {
        console.error("Failed to delete user:", error);
    }
}

// Server Action to delete an item
async function deleteItem(itemId: string) {
    "use server";
    try {
        await requireAdmin();
        await prisma.item.delete({ where: { id: itemId } });
        revalidatePath("/admin");
    } catch (error) {
        console.error("Failed to delete item:", error);
    }
}

// Server Action to toggle featured status
async function toggleFeatured(itemId: string, currentStatus: boolean) {
    "use server";
    try {
        await requireAdmin();
        await prisma.item.update({
            where: { id: itemId },
            data: { featured: !currentStatus }
        });
        revalidatePath("/admin");
    } catch (error) {
        console.error("Failed to toggle feature:", error);
    }
}

export default async function AdminDashboard() {
    await requireAdmin();

    const [usersCount, itemsCount, itemsByCategory, recentUsers, recentItems] = await Promise.all([
        prisma.user.count(),
        prisma.item.count(),
        prisma.item.groupBy({
            by: ['category'],
            _count: { category: true }
        }),
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.item.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        })
    ]);

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <Link href="/items/add" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Add New Item
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{usersCount}</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-sm font-medium text-gray-500">Total Items</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{itemsCount}</p>
                    </div>
                    {itemsByCategory.slice(0, 2).map((cat) => (
                        <div key={cat.category} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <p className="text-sm font-medium text-gray-500">{cat.category}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-2">{cat._count.category}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Recent Registrations */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Users</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                                            {user.name?.[0]?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name || 'Unknown'}</p>
                                            <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <form action={deleteUser.bind(null, user.id)}>
                                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                    </form>
                                </div>
                            ))}
                            {recentUsers.length === 0 && (
                                <div className="p-6 text-center text-gray-500">No users found</div>
                            )}
                        </div>
                    </div>

                    {/* Recent Items */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Items</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {recentItems.map((item) => (
                                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                            <p className="text-sm text-gray-500">${item.price} • {item.user.name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <form action={toggleFeatured.bind(null, item.id, item.featured)}>
                                            <button className={`text-sm font-medium ${item.featured ? 'text-amber-600' : 'text-gray-400 hover:text-gray-600'}`}>
                                                {item.featured ? '★ Featured' : '☆ Feature'}
                                            </button>
                                        </form>
                                        <form action={deleteItem.bind(null, item.id)}>
                                            <button className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                            {recentItems.length === 0 && (
                                <div className="p-6 text-center text-gray-500">No items found</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
