export interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
}

export type ApiResponse<T> = {
    data?: T;
    error?: string;
    status: number;
};
