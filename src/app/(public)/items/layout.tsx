import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Products | Custom Spark",
    description: "Browse our handpicked selection of premium items. Quality electronics, fashion, and home goods at your fingertips.",
    openGraph: {
        title: "Our Products | Custom Spark",
        description: "Browse our handpicked selection of premium items.",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop"],
    },
};

export default function ItemsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
