"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface VesharaLogoProps {
  /**
   * "dark": Dark wordmark for cream/light backgrounds (#F5F3EE)
   * "light": Light/white wordmark for dark backgrounds (#11110F)
   */
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  href?: string | null;
  badge?: string;
  badgeVariant?: "accent" | "subtle" | "outline";
  showWordmark?: boolean;
  className?: string;
  priority?: boolean;
}

export function VesharaLogo({
  variant = "dark",
  size = "md",
  href = "/",
  badge,
  badgeVariant = "subtle",
  showWordmark = true,
  className,
  priority = true,
}: VesharaLogoProps) {
  const sizeMap = {
    sm: {
      logoHeight: 28,
      logoWidth: 96,
      iconSize: 28,
      textSize: "text-[10px]",
    },
    md: {
      logoHeight: 34,
      logoWidth: 118,
      iconSize: 34,
      textSize: "text-xs",
    },
    lg: {
      logoHeight: 42,
      logoWidth: 145,
      iconSize: 42,
      textSize: "text-sm",
    },
  };

  const { logoHeight, logoWidth, iconSize } = sizeMap[size];

  const logoSrc =
    variant === "light"
      ? "/brand/veshara-logo-light.png"
      : "/brand/veshara-logo-dark.png";

  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 select-none transition-transform duration-150 active:scale-[0.98]",
        className
      )}
    >
      {showWordmark ? (
        <div className="relative flex items-center">
          <Image
            src={logoSrc}
            alt="VESHARA"
            width={logoWidth}
            height={logoHeight}
            priority={priority}
            className="h-auto w-auto object-contain transition-all duration-200 group-hover:drop-shadow-[0_2px_14px_rgba(255,107,0,0.35)]"
            style={{ maxHeight: `${logoHeight}px` }}
          />
        </div>
      ) : (
        <div className="relative flex items-center">
          <Image
            src="/brand/veshara-icon.png"
            alt="VESHARA"
            width={iconSize}
            height={iconSize}
            priority={priority}
            className="rounded-xl object-contain transition-all duration-200 group-hover:drop-shadow-[0_2px_14px_rgba(255,107,0,0.35)]"
            style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
          />
        </div>
      )}

      {badge && (
        <span
          className={cn(
            "font-mono font-bold uppercase tracking-wider rounded px-2 py-0.5 text-[10px] shrink-0 transition-colors",
            badgeVariant === "accent" &&
              "bg-accent text-primary border border-primary/20 shadow-xs",
            badgeVariant === "subtle" &&
              variant === "dark" &&
              "bg-orange-500/10 text-orange-700 border border-orange-500/20",
            badgeVariant === "subtle" &&
              variant === "light" &&
              "bg-orange-500/20 text-orange-300 border border-orange-500/30",
            badgeVariant === "outline" &&
              variant === "dark" &&
              "text-secondary border border-border-custom bg-white/60",
            badgeVariant === "outline" &&
              variant === "light" &&
              "text-[#A1A09A] border-[#333] bg-transparent"
          )}
        >
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} prefetch={true} className="group inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
