/* eslint-disable @typescript-eslint/no-unused-vars */
// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      username?: string;
    } & DefaultSession["user"];
  }
}
