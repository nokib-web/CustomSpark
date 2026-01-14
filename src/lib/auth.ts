import { NextAuthOptions, getServerSession as getNextAuthSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/auth/error",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "hello@example.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // This is where you would typically look up the user from your database
                // For demonstration, we'll return a mock user if credentials are provided
                if (credentials?.email && credentials?.password) {
                    return {
                        id: "1",
                        name: "Demo User",
                        email: credentials.email,
                    };
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
};

/**
 * Helper function to get the server session
 */
export const getServerSession = () => getNextAuthSession(authOptions);

/**
 * Function to be used in Server Components to require authentication
 */
export const requireAuth = async () => {
    const session = await getServerSession();
    if (!session) {
        redirect("/login");
    }
    return session;
};
