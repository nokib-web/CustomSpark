export const formatPrice = (price: number | string | null | undefined): string => {
    if (price === null || price === undefined) return "$0.00";
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(numPrice);
};

export const formatDate = (date: Date | string | null | undefined): string => {
    if (!date) return 'N/A';
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(new Date(date));
};

export const formatStock = (stock: number | null | undefined): { label: string; color: string } => {
    if (!stock || stock <= 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (stock < 10) return { label: `Low Stock (${stock})`, color: 'text-amber-600 bg-amber-50' };
    return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
};
