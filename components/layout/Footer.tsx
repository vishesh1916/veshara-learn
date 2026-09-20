import * as React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Youtube, Mail, ArrowUpRight } from "lucide-react";
import { FOOTER_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { VesharaLogo } from "@/components/brand/VesharaLogo";

export function Footer() {
  return (
    <footer className="bg-primary text-cream pt-16 sm:pt-20 pb-12 border-t border-[#252522]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-[#252522]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <VesharaLogo variant="light" size="lg" href="/" />
            <p className="text-[#A1A09A] text-sm sm:text-base leading-relaxed max-w-sm">
              Learn skills. Build proof. Create opportunities. Practical, career-focused digital education for ambitious beginners in India.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_CONFIG.social.instagram}
                className="w-9 h-9 rounded-full bg-[#20201D] border border-[#30302C] flex items-center justify-center text-[#A1A09A] hover:text-accent hover:border-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.linkedin}
                className="w-9 h-9 rounded-full bg-[#20201D] border border-[#30302C] flex items-center justify-center text-[#A1A09A] hover:text-accent hover:border-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.youtube}
                className="w-9 h-9 rounded-full bg-[#20201D] border border-[#30302C] flex items-center justify-center text-[#A1A09A] hover:text-accent hover:border-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="w-9 h-9 rounded-full bg-[#20201D] border border-[#30302C] flex items-center justify-center text-[#A1A09A] hover:text-accent hover:border-accent transition-colors"
                aria-label="Email Us"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A09A]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#D0CFC8] hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Free Resources */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A09A]">
              Free Resources
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#D0CFC8] hover:text-accent transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Trust */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-[#A1A09A]">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#D0CFC8] hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#74736D]">
          <p>© {new Date().getFullYear()} Veshara Learn. All rights reserved.</p>
          <p>
            Secure Indian Payments powered by Razorpay • UPI & Card Protected
          </p>
        </div>
      </Container>
    </footer>
  );
}
