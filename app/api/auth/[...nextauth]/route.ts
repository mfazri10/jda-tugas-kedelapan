import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { NextAuthOptions } from "next-auth";

const handler = NextAuth(authOptions as NextAuthOptions);

export { handler as GET, handler as POST };
