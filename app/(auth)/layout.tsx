import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { VesharaLogo } from "@/components/brand/VesharaLogo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between py-12 px-4 sm:px-6">
      <div className="flex justify-center">
        <VesharaLogo variant="dark" size="lg" href="/" />
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
