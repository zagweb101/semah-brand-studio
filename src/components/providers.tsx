"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {children}
        <Toaster />
        <SonnerToaster
          richColors
          position="top-center"
          dir="rtl"
          toastOptions={{
            style: { direction: "rtl" },
          }}
        />
      </ThemeProvider>
    </SessionProvider>
  );
}
