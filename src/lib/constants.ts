export const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Accessories"
] as const;

export const CATEGORY_OPTIONS = CATEGORIES.map((cat) => ({
    label: cat,
    value: cat.toLowerCase(),
}));

export const API_ENDPOINTS = {
    ITEMS: "/api/items",
    AUTH: {
        REGISTER: "/api/auth/register",
        VALIDATE: "/api/auth/validate",
    },
} as const;

export const PAGINATION = {
    DEFAULT_LIMIT: 8,
    LOAD_MORE_COUNT: 4,
} as const;

export const CURRENCY = {
    CODE: "USD",
    SYMBOL: "$",
    LOCALE: "en-US",
} as const;
