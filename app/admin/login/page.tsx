"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Shield, Lock, Mail, ArrowRight } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      if (email.trim().toLowerCase() === "arisharajput100@gmail.com") {
        toast.success("Admin authorized. Welcome, Arisha!");
        router.push("/admin");
      } else {
        toast.error("Access denied: You do not possess administrator rights.");
        setLoading(false);
      }
    } catch (err: any) {
      toast.error("Authentication failed. Please check your network.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#11110F] text-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1C1C19] border border-[#2D2D29] rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-accent text-primary mx-auto flex items-center justify-center font-bold shadow-lg">
            <Shield className="w-6 h-6" />
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream uppercase tracking-tight">
            Admin Console
          </h1>
          <p className="text-xs font-mono text-[#A1A09A]">
            Secured internal management system
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#DEDDD6]">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A1A09A] absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@veshara.com"
                className="w-full rounded-lg border border-[#33332D] bg-[#11110F] pl-10 pr-4 py-2.5 text-sm text-cream placeholder:text-[#555] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#DEDDD6]">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#A1A09A] absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#33332D] bg-[#11110F] pl-10 pr-4 py-2.5 text-sm text-cream placeholder:text-[#555] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 px-4 rounded-xl bg-accent text-primary font-bold text-sm hover:bg-[#cbf21f] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Access Control Center"}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-[#2D2D29] text-center">
          <Link
            href="/"
            className="text-xs font-mono text-[#A1A09A] hover:text-cream transition-colors inline-flex items-center gap-1"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-sm text-[#A1A09A] font-mono">Loading console...</div>}>
      <AdminLoginForm />
    </React.Suspense>
  );
}
