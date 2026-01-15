import { NextAuthOptions, getServerSession as getNextAuthSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { users } from "@/lib/db";

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
                if (!credentials?.email || !credentials?.password) return null;

                try {
                    // Direct database access is more reliable in Dev mode than internal fetch
                    const user = users.find(u => u.email.toLowerCase() === credentials.email.toLowerCase());

                    if (!user) {
                        return null;
                    }

                    const passwordMatch = await bcrypt.compare(credentials.password, user.passwordHash);

                    if (!passwordMatch) {
                        return null;
                    }

                    // Return user object without sensitive data
                    return {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        role: user.role,
                    };
                } catch (error) {
                    console.error("Auth validation error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
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
