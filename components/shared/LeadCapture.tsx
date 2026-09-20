"use client";

import * as React from "react";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LeadCaptureProps {
  source?: string;
  buttonText?: string;
  placeholder?: string;
  className?: string;
  stacked?: boolean;
}

export function LeadCapture({
  source = "general-resource",
  buttonText = "Download Free",
  placeholder = "Enter your work or personal email...",
  className = "",
  stacked = false,
}: LeadCaptureProps) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [resourceLink, setResourceLink] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please provide a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.resourceLink) {
        setResourceLink(data.resourceLink);
      } else {
        setResourceLink(`/resources/${source}`);
      }

      setSubmitted(true);
      toast.success("Access unlocked! Link sent to your email.");
    } catch (err) {
      setResourceLink(`/resources/${source}`);
      setSubmitted(true);
      toast.success("Access unlocked!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="space-y-3 p-4 bg-[#F5F3EE] border border-border-custom rounded-xl text-primary text-sm">
        <div className="flex items-center gap-2 font-semibold">
          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
          <span>Access Unlocked!</span>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          Link sent to <strong>{email}</strong>. You can also view or download the resource immediately below:
        </p>
        <a
          href={resourceLink || `/resources/${source}`}
          className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-lg bg-accent text-primary text-xs font-bold border border-primary/20 hover:bg-primary hover:text-white transition-colors"
        >
          <span>Open Resource Now →</span>
        </a>
      </div>
    );
  }

  const layoutClass = stacked ? "flex flex-col gap-3" : "flex flex-col sm:flex-row gap-3";

  return (
    <form onSubmit={handleSubmit} className={`${layoutClass} ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
      />
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className={`${stacked ? "w-full justify-center" : "whitespace-nowrap px-6"}`}
      >
        <span>{buttonText}</span>
        {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </form>
  );
}
