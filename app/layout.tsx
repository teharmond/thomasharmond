import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/wrappers/convex-provider-with-clerk";

export const metadata: Metadata = {
  title: "Thomas Harmond",
  description: "Personal website of Thomas Harmond",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <ClerkProvider>
          <ConvexClientProvider>
            {children}
            <Toaster />
            <Analytics />
          </ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
