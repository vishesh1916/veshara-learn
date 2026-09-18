import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ className, hover = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-border-custom rounded-xl p-6 sm:p-8 relative",
        hover && "card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
