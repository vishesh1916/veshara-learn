import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
  wide?: boolean;
}

export function Container({
  className,
  narrow = false,
  wide = false,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-5 sm:px-6 lg:px-8",
        narrow ? "max-w-4xl" : wide ? "max-w-[90rem]" : "max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
