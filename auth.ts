import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./db"
import Google from "next-auth/providers/google"
 
export const { handlers: {GET, POST}, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id  = token.id as string
      return session
    },
  },
  providers: [
        Google({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET
    }), 
  ],
})