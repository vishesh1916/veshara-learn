"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  arrow?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      arrow = false,
      loading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans font-semibold transition-all duration-150 active:scale-[0.97] touch-manipulation select-none disabled:opacity-50 disabled:pointer-events-none rounded-lg cursor-pointer";

    const variants = {
      primary:
        "bg-accent text-primary border border-primary hover:bg-[#cbf21f] hover:shadow-[0_0_20px_rgba(217,255,37,0.4)]",
      secondary:
        "bg-primary text-cream hover:bg-[#22221f] border border-primary shadow-subtle",
      outline:
        "bg-transparent text-primary border border-border-custom hover:border-primary hover:bg-primary/5",
      ghost:
        "bg-transparent text-primary hover:bg-primary/5",
    };

    const sizes = {
      sm: "text-xs px-3.5 py-2 gap-1.5 min-h-[38px]",
      md: "text-sm px-5 py-2.5 gap-2 min-h-[44px]",
      lg: "text-base px-7 py-3.5 gap-2.5 min-h-[48px]",
    };

    const content = (
      <>
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        {arrow && !loading && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        )}
      </>
    );

    if (href) {
      return (
        <Link
          href={href}
          prefetch={true}
          className={cn("group", baseStyles, variants[variant], sizes[size], className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn("group", baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
