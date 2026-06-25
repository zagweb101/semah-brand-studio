import bcrypt from "bcryptjs";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import type { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/?auth=login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const mode = credentials.mode || "login";

        if (mode === "register") {
          // Registration flow
          const existing = await db.user.findUnique({
            where: { email: credentials.email },
          });
          if (existing) {
            throw new Error("An account with this email already exists");
          }
          const hashedPassword = await bcrypt.hash(credentials.password, 12);
          const name = credentials.name || credentials.email.split("@")[0];
          const user = await db.user.create({
            data: {
              email: credentials.email,
              name,
              password: hashedPassword,
            },
          });
          // Create a welcome notification
          await db.notification.create({
            data: {
              userId: user.id,
              title: "Welcome to Semah! 🎉",
              message: `Welcome aboard, ${name}! Your SaaS journey starts here. Explore the dashboard to get started.`,
              type: "success",
            },
          });
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        }

        // Login flow
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // Give new users a free subscription
      if (user.id) {
        await db.subscription.create({
          data: {
            userId: user.id,
            customerId: `cus_demo_${user.id}`,
            status: "active",
            plan: "free",
            currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
          },
        });
      }
    },
  },
};
