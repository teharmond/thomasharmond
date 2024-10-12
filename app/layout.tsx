import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ResponsiveSidebar from "@/components/sidebar/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col md:flex-row h-screen">
            <ResponsiveSidebar />
            <div className="flex-1 overflow-y-auto">
              <main className="flex-1">
                {children}
                <Toaster />
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
