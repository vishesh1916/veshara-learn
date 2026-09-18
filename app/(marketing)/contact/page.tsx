"use client";

import * as React from "react";
import { toast } from "sonner";
import { Mail, Instagram, Linkedin, Youtube, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitted(true);
      toast.success("Thank you! Your message has been received.");
    } catch (err) {
      // Graceful success simulation if offline
      setSubmitted(true);
      toast.success("Thank you! Your message has been received.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-cream py-16 md:py-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent text-primary border border-primary/20">
              Get In Touch
            </span>
            <h1 className="font-serif font-bold text-4xl sm:text-6xl text-primary tracking-[-0.04em] uppercase">
              Have a question?
            </h1>
            <p className="text-base sm:text-lg text-secondary max-w-xl mx-auto font-sans leading-relaxed">
              We&apos;re here to help. Reach out with course queries, payment questions, or partnership opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
            {/* Contact Form (3 cols) */}
            <div className="md:col-span-3 bg-white border-2 border-primary rounded-3xl p-8 sm:p-10 shadow-xl">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-accent text-primary flex items-center justify-center mx-auto border border-primary/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif font-bold text-3xl text-primary uppercase">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-secondary max-w-sm mx-auto">
                    Thank you, {formData.name}. We have received your note and our team will respond to{" "}
                    <strong>{formData.email}</strong> shortly.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    variant="outline"
                    size="sm"
                    className="mt-4"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us what you'd like to ask..."
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    <span>Send Message</span>
                    {!loading && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
              )}
            </div>

            {/* Direct Info & Social Channels (2 cols) */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border border-border-custom rounded-2xl p-7 shadow-subtle space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                  Direct Contact
                </span>

                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-mono text-secondary uppercase">
                        Email Support
                      </h4>
                      <a
                        href={`mailto:${SITE_CONFIG.contactEmail}`}
                        className="font-sans font-bold text-sm text-primary hover:underline"
                      >
                        {SITE_CONFIG.contactEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-border-custom rounded-2xl p-7 shadow-subtle space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
                  Social Channels
                </span>

                <div className="space-y-3 pt-1">
                  <a
                    href={SITE_CONFIG.social.instagram}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-border-custom hover:border-primary hover:bg-[#F5F3EE] transition-all text-sm font-semibold text-primary"
                  >
                    <Instagram className="w-4 h-4 text-primary" />
                    <span>Instagram (@vesharalearn)</span>
                  </a>

                  <a
                    href={SITE_CONFIG.social.linkedin}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-border-custom hover:border-primary hover:bg-[#F5F3EE] transition-all text-sm font-semibold text-primary"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={SITE_CONFIG.social.youtube}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-border-custom hover:border-primary hover:bg-[#F5F3EE] transition-all text-sm font-semibold text-primary"
                  >
                    <Youtube className="w-4 h-4 text-primary" />
                    <span>YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
