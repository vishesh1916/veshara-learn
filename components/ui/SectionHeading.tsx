import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
      {...props}
    >
      {badge && (
        <div className="mb-4 inline-block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20">
            {badge}
          </span>
        </div>
      )}
      <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary tracking-[-0.03em] leading-[0.98] uppercase">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-secondary font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
