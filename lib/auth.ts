import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../app/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Authorization failed: Missing email or password");
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          if (!user || !user.password) {
            console.log(`Authorization failed: User not found or no password for email ${credentials.email}`);
            return null;
          }

          const isValid = await bcrypt.compare(
            credentials.password as string, 
            user.password
          );
          
          if (!isValid) {
            console.log(`Authorization failed: Invalid password for email ${credentials.email}`);
            return null;
          }

          console.log(`Authorization successful for user ${user.email}`);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
