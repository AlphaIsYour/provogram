// lib/auth.ts
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

// Extend NextAuth types to include 'id' in session.user and user
declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { id?: string; username?: string };
  }
  interface User extends DefaultUser {
    id: string;
    username?: string;
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

  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string; // Tambahkan username ke session
      }
      return session;
    },
    async jwt({ token, user }) {
      // Pada saat sign-in awal, 'user' object tersedia
      if (user) {
        token.id = user.id;
        // Ambil username dari 'user' object yang didapat dari database
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { email: true, username: true }, // Include 'username' in the selected fields
        });
        token.username = dbUser?.username;
      }
      return token;
    },
  },
};
