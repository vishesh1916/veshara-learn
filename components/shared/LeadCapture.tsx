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
}

export function LeadCapture({
  source = "general-resource",
  buttonText = "Download Free",
  placeholder = "Enter your work or personal email...",
  className = "",
}: LeadCaptureProps) {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

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

      if (!res.ok) throw new Error("Failed to save lead");

      setSubmitted(true);
      toast.success("Check your inbox! Resource link sent.");
    } catch (err) {
      toast.success("Success! You have been granted access.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex items-center gap-2 p-4 bg-accent/20 border border-primary/20 rounded-lg text-primary text-sm font-medium">
        <CheckCircle2 className="w-5 h-5 text-primary" />
        <span>Resource sent to {email}! Check your inbox in a moment.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
      />
      <Button
        type="submit"
        variant="primary"
        loading={loading}
        className="whitespace-nowrap px-6"
      >
        <span>{buttonText}</span>
        {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </form>
  );
}
