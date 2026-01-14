"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                // Custom branding
                duration: 4000,
                style: {
                    background: "#ffffff",
                    color: "#0f172a",
                    borderRadius: "1rem",
                    padding: "1rem 1.25rem",
                    fontWeight: "600",
                    fontSize: "0.875rem",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
                },
                success: {
                    style: {
                        border: "1px solid #10b981",
                        background: "#ecfdf5",
                        color: "#065f46",
                    },
                    iconTheme: {
                        primary: "#10b981",
                        secondary: "#ffffff",
                    },
                },
                error: {
                    style: {
                        border: "1px solid #ef4444",
                        background: "#fef2f2",
                        color: "#991b1b",
                    },
                    iconTheme: {
                        primary: "#ef4444",
                        secondary: "#ffffff",
                    },
                },
                // Dark mode support via CSS variables if needed, 
                // but for now focusing on premium light/themed look
            }}
        />
    );
}
