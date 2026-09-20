"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  ArrowRight,
  User,
  ChevronDown,
  Sparkles,
  LogOut,
  Award,
  BookOpen,
  Lock,
} from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { VesharaLogo } from "@/components/brand/VesharaLogo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { data: session } = useSession();

  // Instantly derive enrollment status from session JWT (zero-latency, no network flash)
  const isEnrolled = Boolean((session?.user as any)?.isEnrolled);

  // Scroll listener for sticky header
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Bulletproof sign out that eliminates 404s and redirect issues
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: false });
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      window.location.href = "/";
    }
  };

  // Compute dynamic navigation links based on real paid status
  const navLinks = React.useMemo(() => {
    if (session && isEnrolled) {
      return [
        { label: "Home", href: "/" },
        { label: "Course", href: "/course" },
        { label: "Student Portal (LMS)", href: "/dashboard" },
        { label: "Resources", href: "/resources" },
        { label: "About", href: "/about" },
        { label: "FAQ", href: "/faq" },
      ];
    }
    return NAV_LINKS;
  }, [session, isEnrolled]);

  const displayName = session?.user?.name || "Student";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "glass-nav py-3.5 shadow-subtle"
            : "bg-cream/70 backdrop-blur-sm py-5 border-b border-border-custom/50"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <VesharaLogo variant="dark" size="md" href="/" />

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isPortalLink = link.href === "/dashboard";

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5",
                    isActive ? "text-primary font-semibold" : "text-secondary",
                    isPortalLink &&
                      "bg-accent/20 px-2.5 py-1 rounded-full border border-primary/20 text-primary font-semibold"
                  )}
                >
                  {isPortalLink && (
                    <span className="w-2 h-2 rounded-full bg-accent border border-primary animate-pulse" />
                  )}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA & Profile Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!session ? (
              <>
                {/* 1. Unauthenticated: Sign In Button */}
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary px-4 py-2 rounded-xl border border-border-custom hover:border-primary transition-all bg-white shadow-xs hover:bg-[#FAF9F5]"
                >
                  <User className="w-4 h-4 text-secondary" />
                  <span>Sign In</span>
                </Link>

                <Button href="/enroll" size="sm" variant="primary" arrow>
                  Start Learning — ₹199
                </Button>
              </>
            ) : (
              <>
                {/* 2. Authenticated: Profile Pill & Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-custom bg-white hover:border-primary transition-all text-left shadow-xs cursor-pointer group"
                    aria-label="User Profile Menu"
                  >
                    <div className="w-7 h-7 rounded-full bg-primary text-cream flex items-center justify-center font-mono text-xs font-bold uppercase shrink-0">
                      {userInitial}
                    </div>
                    <span className="text-xs font-bold text-primary max-w-[110px] truncate">
                      {displayName.split(" ")[0]}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-secondary group-hover:text-primary transition-transform" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-72 bg-white border border-border-custom rounded-2xl shadow-xl p-3.5 z-50 animate-fade-in space-y-2">
                      <div className="pb-3 border-b border-border-custom px-2 space-y-1.5">
                        <p className="font-bold text-sm text-primary truncate">
                          {displayName}
                        </p>
                        <p className="text-xs font-mono text-secondary truncate">
                          {session.user?.email}
                        </p>
                        <div className="pt-1">
                          {isEnrolled ? (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-accent text-primary border border-primary/20">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                              <span>Enrolled (Active)</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase font-bold px-2.5 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">
                              <Lock className="w-3 h-3 text-red-600" />
                              <span>Course Not Unlocked</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        {isEnrolled ? (
                          <>
                            <Link
                              href="/dashboard"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 text-xs font-bold text-primary p-2 rounded-xl hover:bg-[#F5F3EE] transition-colors"
                            >
                              <BookOpen className="w-4 h-4 text-primary" />
                              <span>My Student Portal (LMS)</span>
                            </Link>
                            <Link
                              href="/dashboard/certificates"
                              onClick={() => setProfileDropdownOpen(false)}
                              className="flex items-center gap-2.5 text-xs font-medium text-primary p-2 rounded-xl hover:bg-[#F5F3EE] transition-colors"
                            >
                              <Award className="w-4 h-4 text-secondary" />
                              <span>My Certificates</span>
                            </Link>
                          </>
                        ) : (
                          <Link
                            href="/enroll"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 text-xs font-bold text-primary p-2 rounded-xl bg-accent/20 hover:bg-accent/40 border border-primary/20 transition-colors"
                          >
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span>Unlock Full Course (₹199)</span>
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2.5 text-xs font-medium text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors cursor-pointer text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Primary CTA: Student Portal (if paid) OR Unlock Course (if unpaid) */}
                {isEnrolled ? (
                  <Button href="/dashboard" size="sm" variant="primary" arrow>
                    Student Portal
                  </Button>
                ) : (
                  <Button href="/enroll" size="sm" variant="primary" arrow>
                    Unlock Course — ₹199
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {!session ? (
              <Link
                href="/login"
                className="text-xs font-bold px-3 py-1.5 rounded-lg border border-border-custom bg-white text-primary"
              >
                Sign In
              </Link>
            ) : isEnrolled ? (
              <Link
                href="/dashboard"
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-accent text-primary border border-primary"
              >
                LMS
              </Link>
            ) : (
              <Link
                href="/enroll"
                className="text-xs font-bold px-3 py-1.5 rounded-lg bg-accent text-primary border border-primary"
              >
                ₹199
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] z-40 bg-cream/98 backdrop-blur-xl md:hidden flex flex-col justify-between p-6 border-t border-border-custom animate-fade-in overflow-y-auto">
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block font-serif text-2xl font-bold text-primary tracking-tight py-2 border-b border-border-custom/50 active:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile User Profile Section */}
            <div className="pt-2">
              {!session ? (
                <Link
                  href="/login"
                  prefetch={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-3 text-sm font-bold text-primary rounded-xl bg-white border border-border-custom shadow-xs"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In to Account</span>
                </Link>
              ) : (
                <div className="bg-white border border-border-custom rounded-2xl p-4 space-y-3 shadow-subtle">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary text-cream flex items-center justify-center font-bold text-sm">
                      {userInitial}
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-bold text-sm text-primary truncate">
                        {displayName}
                      </p>
                      <p className="text-xs font-mono text-secondary truncate">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border-custom flex items-center justify-between">
                    <span className="text-xs font-mono text-secondary">Status:</span>
                    {isEnrolled ? (
                      <span className="text-xs font-mono font-bold text-primary bg-accent px-2 py-0.5 rounded">
                        Enrolled ✓
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        Unenrolled
                      </span>
                    )}
                  </div>

                  {isEnrolled ? (
                    <Link
                      href="/dashboard"
                      prefetch={true}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-primary text-cream font-bold text-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Open Student Portal</span>
                    </Link>
                  ) : (
                    <Link
                      href="/enroll"
                      prefetch={true}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-accent text-primary font-bold text-sm border border-primary"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Unlock Course (₹199)</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-red-600 pt-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 pb-4 space-y-3">
            {!isEnrolled && (
              <Button
                href="/enroll"
                size="lg"
                variant="primary"
                className="w-full py-4 text-base"
                arrow
              >
                Start Learning — ₹199
              </Button>
            )}
            <p className="text-center text-xs text-secondary font-mono">
              Instant lifetime access • UPI & Cards supported
            </p>
          </div>
        </div>
      )}
    </>
  );
}
