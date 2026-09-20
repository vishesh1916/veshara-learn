"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Download,
  ExternalLink,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VesharaLogo } from "@/components/brand/VesharaLogo";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Bulletproof sign out eliminating 404s
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      window.location.href = "/";
    }
  };

  const navItems = [
    { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/dashboard/courses/social-media-manager", icon: BookOpen },
    { label: "Certificates", href: "/dashboard/certificates", icon: Award },
    { label: "Resource Library", href: "/dashboard/resources", icon: Download },
  ];

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 bg-white border-b border-border-custom sticky top-0 z-30">
        <VesharaLogo variant="dark" size="sm" href="/" />
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-primary hover:opacity-75 transition-opacity cursor-pointer rounded-lg"
          aria-label="Toggle Dashboard Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Drawer / Fixed desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-border-custom flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 shrink-0",
          mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        )}
      >
        <div>
          {/* Logo Brand Header */}
          <div className="px-5 py-5 border-b border-border-custom flex items-center justify-between">
            <div className="flex items-center justify-between gap-3 w-full">
              <VesharaLogo variant="dark" size="sm" href="/" />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 text-secondary hover:text-primary"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all touch-manipulation min-h-[44px]",
                    isActive
                      ? "bg-primary text-cream shadow-sm"
                      : "text-secondary hover:text-primary hover:bg-[#F5F3EE] active:bg-[#ECEAE4]"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-accent" : "text-secondary")} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Profile & Logout Bottom section */}
        <div className="p-4 border-t border-border-custom bg-[#FAF9F5]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-sm border border-primary/20 shrink-0">
              {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "S"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-primary truncate">
                {session?.user?.name || "Student"}
              </p>
              <p className="text-[11px] text-secondary truncate font-mono">
                {session?.user?.email || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border-custom/60">
            <Link
              href="/"
              prefetch={true}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs text-secondary hover:text-primary hover:bg-white transition-colors min-h-[38px]"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Website</span>
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-2 rounded text-xs text-red-600 hover:bg-red-50 transition-colors cursor-pointer min-h-[38px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
}
