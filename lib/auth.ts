// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

// Extend NextAuth types to include 'id' in session.user and user
declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & { id?: string };
  }
  interface User extends DefaultUser {
    id: string;
  }
}

export const authOptions: NextAuthOptions = {
  // Gunakan PrismaAdapter untuk menghubungkan NextAuth ke DB
  adapter: PrismaAdapter(prisma),

  // Konfigurasi provider login (dalam kasus ini, Google)
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  // Sesi akan disimpan sebagai JSON Web Token (JWT)
  session: {
    strategy: "jwt",
  },

  // Callback untuk menambahkan info custom (seperti ID user) ke session
  callbacks: {
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          session.user.id = typeof token.id === "string" ? token.id : undefined;
        }
        // Jika kamu menambahkan role di skema, bisa juga ditambahkan di sini
        // session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // token.role = user.role;
      }
      return token;
    },
  },
};
