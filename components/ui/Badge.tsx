import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "accent" | "outline" | "dark" | "muted";
}

export function Badge({
  className,
  variant = "accent",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    accent: "bg-accent text-primary border border-primary/20",
    outline: "bg-transparent text-primary border border-border-custom",
    dark: "bg-primary text-cream border border-primary",
    muted: "bg-[#EAE8E1] text-secondary border border-border-custom",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
