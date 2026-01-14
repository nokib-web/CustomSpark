import { toast } from "react-hot-toast";

/**
 * Premium toast utility functions
 */
export const showSuccess = (message: string) => {
    return toast.success(message);
};

export const showError = (message: string) => {
    return toast.error(message || "Something went wrong. Please try again.");
};

export const showInfo = (message: string) => {
    return toast(message, {
        icon: "ℹ️",
        style: {
            border: "1px solid #3b82f6",
            background: "#eff6ff",
            color: "#1e40af",
        },
    });
};

export const showLoading = (message: string) => {
    return toast.loading(message);
};

export const dismissToast = (toastId?: string) => {
    toast.dismiss(toastId);
};
