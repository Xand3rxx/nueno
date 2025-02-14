import NextAuth, { Session } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

import { verifyPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@test.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"email" | "password", string> | undefined) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          include: { Company: true },
        });

        if (!user) return null;

        const isCorrectPassword = await verifyPassword(credentials.password, user.password as string);
        if (isCorrectPassword) {
          return user;
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      const currentSession: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
        },
      };
      return currentSession;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
  },
  pages: {
    signIn: "/auth/login",
  },
});
