"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState("");
  const [sent, setSent] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    toast.success("Password reset instructions sent to your email.");
  };

  return (
    <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif font-bold text-3xl text-primary uppercase tracking-tight">
          Reset Password
        </h1>
        <p className="text-xs sm:text-sm text-secondary">
          Enter your registered email address to receive reset instructions
        </p>
      </div>

      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center mx-auto border border-primary/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="text-sm text-primary font-medium">
            We have sent password reset instructions to <strong>{email}</strong>. Please check your inbox or spam folder.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary hover:underline pt-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to login</span>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Your Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. rahul@gmail.com"
                className="w-full rounded-lg border border-border-custom bg-white pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
            <span>Send Reset Instructions</span>
            <Send className="w-4 h-4 ml-2" />
          </Button>

          <div className="text-center pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to login</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
