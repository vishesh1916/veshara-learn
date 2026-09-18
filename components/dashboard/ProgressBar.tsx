import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0 to 100
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({
  value,
  className,
  showLabel = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("space-y-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-mono font-bold text-secondary">
          <span>Completion</span>
          <span className="text-primary">{clamped}%</span>
        </div>
      )}
      <div className="h-2.5 w-full rounded-full bg-border-custom overflow-hidden">
        <div
          className="h-full rounded-full bg-accent border-r border-primary/20 transition-all duration-500 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
