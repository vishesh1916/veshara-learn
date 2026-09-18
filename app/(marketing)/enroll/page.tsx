"use client";

import * as React from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
  Check,
  ShieldCheck,
  Lock,
  Sparkles,
  Loader2,
  ArrowRight,
  UserCheck,
} from "lucide-react";
import { COURSE, INCLUSIONS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function EnrollPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [studentDetails, setStudentDetails] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const [isProcessing, setIsProcessing] = React.useState(false);
  const [razorpayReady, setRazorpayReady] = React.useState(false);

  // Pre-fill student details if logged in
  React.useEffect(() => {
    if (session?.user) {
      setStudentDetails((prev) => ({
        ...prev,
        name: session.user.name || prev.name,
        email: session.user.email || prev.email,
      }));
    }
  }, [session]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!studentDetails.name || !studentDetails.email) {
      toast.error("Please enter your name and email.");
      return;
    }

    if (!window.Razorpay) {
      toast.error("Razorpay is still initializing. Please wait a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: COURSE.price, // 19900 paisa = ₹199
          studentName: studentDetails.name,
          studentEmail: studentDetails.email,
          studentPhone: studentDetails.phone,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(orderData.message || "Could not initialize checkout.");
      }

      // 2. Open Razorpay Checkout Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Veshara Learn",
        description: "Social Media Manager Course (Lifetime Access)",
        order_id: orderData.orderId,
        prefill: {
          name: studentDetails.name,
          email: studentDetails.email,
          contact: studentDetails.phone || "9999999999",
        },
        theme: {
          color: "#D9FF25",
        },
        handler: async function (response: any) {
          try {
            // 3. Verify Payment
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                studentEmail: studentDetails.email,
                studentName: studentDetails.name,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              toast.success("Payment confirmed! Accessing your course...");
              router.push(`/payment-success?payment_id=${response.razorpay_payment_id}`);
            } else {
              router.push("/payment-failed");
            }
          } catch (err) {
            router.push("/payment-failed");
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Checkout was cancelled.");
          },
        },
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.open();
    } catch (err: any) {
      console.error("Payment error:", err);
      toast.error(err.message || "Failed to start payment.");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayReady(true)}
      />

      <div className="bg-cream py-12 md:py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-3 mb-10">
              <span className="text-xs font-mono font-bold uppercase tracking-wider bg-accent text-primary px-3 py-1 rounded-full border border-primary/20">
                1-Step Fast Checkout
              </span>
              <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
                Enroll In Veshara Learn
              </h1>
              <p className="text-secondary text-sm sm:text-base font-sans">
                Get immediate lifetime access to the complete Social Media Manager curriculum.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* Checkout Form (7 cols) */}
              <div className="md:col-span-7 bg-white border-2 border-primary rounded-3xl p-6 sm:p-10 shadow-xl">
                <div className="pb-6 border-b border-border-custom mb-6 flex items-center justify-between">
                  <h2 className="font-serif font-bold text-2xl text-primary uppercase">
                    Student Details
                  </h2>
                  <span className="text-xs font-mono text-secondary">Step 1 of 1</span>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Verma"
                      value={studentDetails.name}
                      onChange={(e) =>
                        setStudentDetails({ ...studentDetails, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      Email Address (For Course Access) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rahul@gmail.com"
                      value={studentDetails.email}
                      onChange={(e) =>
                        setStudentDetails({ ...studentDetails, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                    <p className="text-[11px] text-secondary">
                      Your login credentials and payment receipt will be sent here.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-primary">
                      WhatsApp / Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={studentDetails.phone}
                      onChange={(e) =>
                        setStudentDetails({ ...studentDetails, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-border-custom bg-white px-4 py-3 text-sm text-primary placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary shadow-subtle"
                    />
                  </div>

                  {/* Trust Banner */}
                  <div className="p-3.5 bg-[#F5F3EE] rounded-xl border border-border-custom flex items-center gap-3 text-xs text-secondary">
                    <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                    <span>
                      Guaranteed secure checkout via Razorpay with instant dashboard activation.
                    </span>
                  </div>

                  {/* Payment Button */}
                  <div className="pt-3">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      loading={isProcessing}
                      className="w-full text-base py-4 shadow-[0_4px_24px_rgba(217,255,37,0.4)]"
                    >
                      <span>Pay ₹199 & Unlock Course</span>
                      {!isProcessing && <ArrowRight className="w-4 h-4 ml-2" />}
                    </Button>
                  </div>

                  <div className="pt-2 text-center text-xs font-mono text-secondary flex items-center justify-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    <span>UPI (Google Pay, PhonePe, Paytm) • Cards • Net Banking</span>
                  </div>
                </form>
              </div>

              {/* Order Summary (5 cols) */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-white border border-border-custom rounded-3xl p-6 sm:p-8 shadow-subtle space-y-6">
                  <div className="space-y-1 pb-4 border-b border-border-custom">
                    <span className="text-[11px] font-mono font-bold uppercase text-secondary">
                      Order Summary
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-primary uppercase">
                      {COURSE.title}
                    </h3>
                    <p className="text-xs text-secondary">{COURSE.subtitle}</p>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-secondary">
                      <span>Full 8-Module Video Course</span>
                      <span className="line-through font-mono">₹2,499</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Templates & Outreach Scripts</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between text-secondary">
                      <span>Official Certificate of Completion</span>
                      <span>FREE</span>
                    </div>
                    <div className="pt-3 border-t border-border-custom flex justify-between items-baseline font-bold text-lg text-primary">
                      <span>Total Amount</span>
                      <span className="font-serif text-3xl">₹199</span>
                    </div>
                    <span className="block text-[11px] font-mono text-right text-secondary">
                      Inclusive of all taxes • One-time fee
                    </span>
                  </div>

                  {/* Inclusions Quick Check */}
                  <div className="space-y-2 pt-2 border-t border-border-custom">
                    <h5 className="text-xs font-mono font-bold uppercase text-primary mb-3">
                      Everything included:
                    </h5>
                    {INCLUSIONS.slice(0, 5).map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-secondary">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantee Note */}
                <div className="bg-[#ECEAE4] border border-border-custom rounded-2xl p-5 text-center text-xs text-secondary">
                  <strong>Need help enrolling?</strong> Contact support at{" "}
                  <a href="mailto:arisharajput100@gmail.com" className="text-primary font-bold">
                    arisharajput100@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
