import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Download, ShieldCheck } from "lucide-react";
import { FREE_RESOURCES } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { LeadCapture } from "@/components/shared/LeadCapture";

export function generateStaticParams() {
  return FREE_RESOURCES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const resource = FREE_RESOURCES.find((r) => r.slug === params.slug);
  if (!resource) return { title: "Resource Not Found" };

  return {
    title: `${resource.title} — Free Download | Veshara Learn`,
    description: resource.description,
  };
}

export default function ResourceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const resource = FREE_RESOURCES.find((r) => r.slug === params.slug);

  if (!resource) {
    notFound();
  }

  return (
    <div className="bg-cream py-16 md:py-24">
      <Container narrow>
        <div className="mb-8">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Resources</span>
          </Link>
        </div>

        <div className="bg-white border-2 border-primary rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-accent text-primary px-3 py-1 rounded-full border border-primary/20">
                {resource.type}
              </span>
              <span className="text-xs font-mono text-secondary">
                Free Download • Instant PDF / Sheet Access
              </span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
              {resource.title}
            </h1>

            <p className="text-base sm:text-lg text-secondary leading-relaxed font-sans">
              {resource.description}
            </p>
          </div>

          {/* What's Inside */}
          <div className="bg-[#F5F3EE] p-6 sm:p-8 rounded-2xl border border-border-custom space-y-4">
            <h3 className="font-serif font-bold text-xl text-primary uppercase">
              What&apos;s inside this resource:
            </h3>
            <div className="space-y-2.5">
              {resource.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-primary">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Email Capture Box */}
          <div className="pt-2 space-y-4">
            <div className="text-left">
              <h3 className="font-serif font-bold text-2xl text-primary uppercase">
                Where should we send your download?
              </h3>
              <p className="text-xs sm:text-sm text-secondary mt-1">
                Enter your email address below. We will send the access link right away.
              </p>
            </div>

            <LeadCapture
              source={resource.slug}
              buttonText="Get Instant Free Download"
              placeholder="Enter your email address..."
            />

            <div className="flex items-center gap-2 text-xs font-mono text-secondary pt-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Zero spam. You can unsubscribe with one click anytime.</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
