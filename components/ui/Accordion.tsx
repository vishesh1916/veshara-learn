"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id?: string;
  number?: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
  defaultOpenIndex?: number;
}

export function Accordion({
  items,
  className,
  allowMultiple = false,
  defaultOpenIndex,
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggleItem = (index: number) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className={cn("divide-y divide-border-custom border-y border-border-custom", className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        return (
          <div
            key={item.id || index}
            className={cn(
              "transition-colors duration-200",
              isOpen ? "bg-white/60" : "hover:bg-white/30"
            )}
          >
            <button
              onClick={() => toggleItem(index)}
              className="flex w-full items-center justify-between py-6 px-4 sm:px-6 text-left focus:outline-none"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-4 sm:gap-6 pr-4">
                {item.number && (
                  <span className="font-mono text-sm font-bold text-secondary">
                    {item.number}
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-sans font-semibold text-lg sm:text-xl text-primary">
                      {item.title}
                    </h3>
                    {item.badge && (
                      <span className="hidden sm:inline-block text-[11px] font-semibold uppercase tracking-wider bg-accent/30 text-primary px-2.5 py-0.5 rounded border border-primary/10">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-200",
                  isOpen
                    ? "border-primary bg-primary text-cream"
                    : "border-border-custom bg-white text-primary"
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </div>
            </button>

            {isOpen && (
              <div className="px-4 sm:px-6 pb-6 pt-1 text-secondary text-base sm:text-lg leading-relaxed border-l-2 border-accent ml-4 sm:ml-6 mb-4 animate-fade-in">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
