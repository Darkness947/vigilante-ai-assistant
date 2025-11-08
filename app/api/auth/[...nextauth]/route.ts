import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/user.model"
import bcrypt from "bcryptjs"
import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

// 1. We deconstruct the 'handlers' object from the NextAuth result
const { handlers } = NextAuth({
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("No user found with this email");
                    }
                    const isPasswordCorrect = await user.comparePassword(credentials.password);
                    if (isPasswordCorrect) {
                        return user; 
                    } else {
                        throw new Error("Incorrect password");
                    }
                } catch (err: any) {
                    throw new Error(err);
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(); 
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token && session.user) {
                session.user._id = token._id; 
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

// 2. Now we export GET and POST from the 'handlers' object
export const { GET, POST } = handlers;
