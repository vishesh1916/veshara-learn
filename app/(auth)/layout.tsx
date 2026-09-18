import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="text-center">
        <Link href="/" className="inline-block">
          <span className="font-serif font-bold text-3xl sm:text-4xl text-primary tracking-[-0.04em] uppercase">
            Veshara<span className="text-secondary font-light">.learn</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md mx-auto my-auto py-8">
        {children}
      </div>

      <div className="text-center text-xs text-secondary">
        © {new Date().getFullYear()} Veshara Learn. Practical skills for the digital economy.
      </div>
    </div>
  );
}
