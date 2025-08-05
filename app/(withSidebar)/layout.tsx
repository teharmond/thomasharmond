import React from "react";
import Substack from "@/components/substack";
import Link from "next/link";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="w-full max-w-2xl flex flex-col pt-12 md:pt-24 gap-12 mx-auto px-2">
        <header className="flex flex-col px-2 font-mono">
          <Link href="/" className=" font-medium ">
            Thomas Harmond
          </Link>
          <div className=" text-[hsl(var(--muted-foreground))] ">
            <div className="flex items-center gap-1">
              <p>This is my notebook.</p>
              <div className="h-5 w-1 rounded-full bg-blue-500 animate-blink" />
            </div>
          </div>
        </header>

        {children}
        <Substack />
        <footer className="text-xs text-[hsl(var(--muted-foreground))] my-12 flex  gap-3 px-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="text-[hsl(var(--muted-foreground))]">|</span>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <span className="text-[hsl(var(--muted-foreground))]">|</span>
          <Link href="mailto:hey@thomasharmond.com" className="hover:underline">
            hey@thomasharmond.com
          </Link>
        </footer>
      </div>
    </main>
  );
}
