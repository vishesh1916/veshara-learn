"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

      toast.success("Account created successfully! Signing in...");

      // Automatically sign in
      const loginRes = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (!loginRes?.error) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to create account.");
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-primary uppercase tracking-tight">
          Create Account
        </h1>
        <p className="text-xs sm:text-sm text-secondary">
          Join Veshara Learn to access your courses and certificates
        </p>
      </div>

      {/* Google Sign Up */}
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-border-custom bg-white hover:bg-[#F5F3EE] hover:border-primary text-primary font-sans font-bold text-sm shadow-subtle transition-all cursor-pointer group"
      >
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        <span>Sign Up with Google</span>
      </button>

      <div className="relative flex items-center justify-center my-2">
        <div className="border-t border-border-custom w-full" />
        <span className="bg-white px-3 text-[11px] font-mono uppercase tracking-wider text-secondary shrink-0">
          Or register with email
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full rounded-lg border border-border-custom bg-white pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. rahul@gmail.com"
              className="w-full rounded-lg border border-border-custom bg-white pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
            Phone / WhatsApp Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. 9876543210"
              className="w-full rounded-lg border border-border-custom bg-white pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
            Password (min 6 characters) *
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-secondary absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full rounded-lg border border-border-custom bg-white pl-10 pr-4 py-2.5 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full mt-2"
        >
          <span>Create Student Account</span>
          {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </form>

      <div className="pt-4 border-t border-border-custom text-center text-xs text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">
          Sign in here →
        </Link>
      </div>
    </div>
  );
}
