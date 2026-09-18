import * as React from "react";
import type { Metadata } from "next";
import { CreditCard, IndianRupee, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPrice, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Payment Transactions — Veshara Learn Admin",
};

export default async function AdminPaymentsPage() {
  let paymentRecords: any[] = [];
  try {
    paymentRecords = await prisma.payment.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (e) {
    console.warn("AdminPaymentsPage DB query notice:", e);
  }

  const totalRevenue = paymentRecords.reduce(
    (acc: number, p: any) => acc + (p.amount || 0),
    0
  );

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-custom">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary">
            Financial Ledger
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-primary uppercase tracking-tight">
            Payment Transactions
          </h1>
          <p className="text-secondary text-sm sm:text-base mt-1">
            Real-time payments captured via Razorpay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border-2 border-primary rounded-xl px-4 py-2 flex items-center gap-2 text-xs font-mono font-bold text-primary shadow-subtle">
            <span>Total Captured: {formatPrice(totalRevenue)}</span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border-2 border-primary rounded-3xl overflow-hidden shadow-subtle">
        <div className="p-6 border-b border-border-custom flex items-center justify-between">
          <h3 className="font-serif font-bold text-xl text-primary uppercase">
            Captured Payments
          </h3>
          <span className="text-xs font-mono text-secondary">
            {paymentRecords.length} Transactions Recorded
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#FAF9F5] border-b border-border-custom text-xs font-mono uppercase text-secondary">
                <th className="py-4 px-6 font-semibold">Payment ID</th>
                <th className="py-4 px-6 font-semibold">Student</th>
                <th className="py-4 px-6 font-semibold">Amount</th>
                <th className="py-4 px-6 font-semibold">Timestamp</th>
                <th className="py-4 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-custom">
              {paymentRecords.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs font-mono text-secondary">
                    No payment transactions recorded in database yet.
                  </td>
                </tr>
              ) : (
                paymentRecords.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F5F3EE]/50 transition-colors">
                    <td className="py-4 px-6 font-mono text-xs font-bold text-primary">
                      {tx.razorpayPaymentId || tx.razorpayOrderId || tx.id}
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-primary text-xs">{tx.user?.name || "Student"}</p>
                      <p className="font-mono text-[11px] text-secondary">{tx.user?.email || "—"}</p>
                    </td>
                    <td className="py-4 px-6 font-mono font-bold text-primary">
                      {formatPrice(tx.amount)}
                    </td>
                    <td className="py-4 px-6 font-mono text-xs text-secondary">
                      {formatDate(tx.createdAt)}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-accent text-primary border border-primary/20">
                        ✓ {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
