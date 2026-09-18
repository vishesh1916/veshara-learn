import * as React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-cream text-primary">
      <Navbar />
      <main className="flex-1 pt-[72px] sm:pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
}
