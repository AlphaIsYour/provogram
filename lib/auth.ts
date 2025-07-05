/* eslint-disable @typescript-eslint/no-unused-vars */
// lib/auth.ts
import NextAuth, {
  NextAuthOptions,
  DefaultSession,
  DefaultUser,
  getServerSession,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

// Extend NextAuth types to include additional fields
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    id: string;
    username?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          username: user.username ?? undefined,
          image: user.image,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Pada saat sign-in awal, 'user' object tersedia
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      // Handle OAuth providers (Google & GitHub)
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          // Check if user already exists
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });

          if (!existingUser) {
            // Create username from email or name
            let username = user.email!.split("@")[0];

            // Check if username is taken and make it unique
            const existingUsername = await prisma.user.findUnique({
              where: { username },
            });

            if (existingUsername) {
              username = `${username}_${Date.now()}`;
            }

            // Create new user for OAuth sign-in
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name!,
                username,
                image: user.image,
                emailVerified: new Date(),
              },
            });

            // Set username for the session
            user.username = newUser.username ?? undefined;
          } else {
            // User exists, use existing username
            user.username = existingUser.username ?? undefined;
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }

      return true;
    },
  },
};

// NextAuth v4 export
export default NextAuth(authOptions);

// Export auth function untuk server actions
export const auth = () => getServerSession(authOptions);

// Export getServerSession dengan authOptions untuk kemudahan
export const getAuthSession = () => getServerSession(authOptions);
