import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter both email and password.");
        }

        const normalizedEmail = credentials.email.trim().toLowerCase();

        try {
          let user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!user) {
            // Create student account (access unlocked only after payment)
            const passwordHash = await bcrypt.hash(credentials.password, 10);
            const userName =
              normalizedEmail.split("@")[0].replace(/[^a-zA-Z]/g, " ") ||
              "Student Learner";
            user = await prisma.user.create({
              data: {
                name: userName.charAt(0).toUpperCase() + userName.slice(1),
                email: normalizedEmail,
                passwordHash,
                role:
                  normalizedEmail === "arisharajput100@gmail.com"
                    ? "ADMIN"
                    : "STUDENT",
              },
            });

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }

          if (user.passwordHash) {
            const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
            if (!isValid) {
              throw new Error("Invalid password for this existing account.");
            }
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
          throw new Error(error.message || "Authentication failed.");
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" && user.email) {
        const normalizedEmail = user.email.trim().toLowerCase();
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          if (!existingUser) {
            const isAdmin = normalizedEmail === "arisharajput100@gmail.com";
            const newUser = await prisma.user.create({
              data: {
                name: user.name || "Student",
                email: normalizedEmail,
                image: user.image,
                role: isAdmin ? "ADMIN" : "STUDENT",
              },
            });
            user.id = newUser.id;
            (user as any).role = newUser.role;
          } else {
            user.id = existingUser.id;
            (user as any).role = existingUser.role;
          }
        } catch (err) {
          console.error("Error in Google signIn callback:", err);
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "STUDENT";
      }

      if (token.email) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: token.email.toLowerCase() },
            select: {
              id: true,
              role: true,
              enrollments: { select: { id: true } },
            },
          });
          if (dbUser) {
            token.id = dbUser.id;
            token.role = dbUser.role;
            token.isEnrolled =
              dbUser.role === "ADMIN" ||
              token.email.toLowerCase() === "arisharajput100@gmail.com" ||
              (dbUser.enrollments && dbUser.enrollments.length > 0);
          }
        } catch (e) {
          // Keep current token if DB read fails
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as string) || "STUDENT";
        (session.user as any).isEnrolled = Boolean(token.isEnrolled);
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

