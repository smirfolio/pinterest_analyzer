import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "[email protected]" },
      },
      // POC skeleton: any email is accepted.
      async authorize(credentials) {
        const email = credentials?.email?.trim();
        if (!email) return null;
        return {
          id: email,
          name: email.split("@")[0] || email,
          email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email ?? token.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "dev-nextauth-secret-change-me",
};