"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  BarChart3,
  BookOpen,
  Users,
  CreditCard,
  PlusCircle,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const adminNav = [
    { label: "Dashboard Overview", href: "/admin", icon: BarChart3 },
    { label: "Course Management", href: "/admin/courses", icon: BookOpen },
    { label: "Student Roster", href: "/admin/students", icon: Users },
    { label: "Payment History", href: "/admin/payments", icon: CreditCard },
  ];

  return (
    <>
      {/* Mobile Top Header for Admin */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-primary text-cream sticky top-0 z-30 border-b border-[#252522]">
        <div className="flex items-center gap-2.5">
          <Link href="/admin" className="font-serif font-bold text-lg text-cream uppercase tracking-tight">
            Veshara<span className="text-accent">.admin</span>
          </Link>
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider bg-accent text-primary px-2 py-0.5 rounded">
            Admin
          </span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-cream hover:text-accent transition-colors"
          aria-label="Toggle Admin Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 bg-primary text-cream flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 border-r border-[#252522] shrink-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:static"
        )}
      >
        <div>
          {/* Admin Header */}
          <div className="px-5 py-5 border-b border-[#252522]">
            <div className="flex items-center justify-between gap-3">
              <Link href="/admin" className="inline-block">
                <span className="font-serif font-bold text-xl text-cream tracking-tight uppercase">
                  Veshara<span className="text-accent">.admin</span>
                </span>
              </Link>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-accent text-primary px-2.5 py-0.5 rounded-full shrink-0 shadow-xs">
                Admin
              </span>
            </div>
          </div>

          {/* Nav items */}
          <nav className="p-4 space-y-1.5">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all",
                    isActive
                      ? "bg-accent text-primary font-bold shadow-sm"
                      : "text-[#A1A09A] hover:text-cream hover:bg-[#1E1E1B]"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 mt-4 border-t border-[#252522]">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs font-mono text-[#A1A09A] hover:text-accent hover:bg-[#1E1E1B] transition-colors"
              >
                <span>View Student Dashboard →</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="p-4 border-t border-[#252522] bg-[#161614]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-xs">
              AR
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-cream truncate">Arisha Rajput</p>
              <p className="text-[11px] text-[#A1A09A] truncate font-mono">
                arisharajput100@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-[#252522]">
            <Link
              href="/"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-xs text-[#A1A09A] hover:text-cream transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded text-xs text-red-400 hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}
    </>
  );
}
