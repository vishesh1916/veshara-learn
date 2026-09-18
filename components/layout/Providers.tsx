"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#11110F",
            color: "#F5F3EE",
            border: "1px solid #22221F",
          },
        }}
      />
    </SessionProvider>
  );
}
