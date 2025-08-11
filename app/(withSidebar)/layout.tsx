import React from "react";
import Substack from "@/components/substack";
import Link from "next/link";
import { GeistMono } from "geist/font/mono";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={`flex-1 ${GeistMono.className}`}>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-12 px-2 pt-12 md:pt-24">
        <header className="flex flex-col px-2 font-mono">
          <Link href="/" className="font-medium">
            Thomas Harmond
          </Link>
          <div className="text-muted-foreground">
            <div className="flex items-center gap-1">
              <p>This is my notebook.</p>
              <div className="animate-blink h-5 w-1 rounded-full bg-blue-500" />
            </div>
          </div>
        </header>

        {children}
        <Substack />
        <footer className="text-muted-foreground my-12 flex gap-3 px-2 text-xs">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link href="mailto:hey@thomasharmond.com" className="hover:underline">
            hey@thomasharmond.com
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link
            href="https://github.com/teharmond/thomasharmond"
            className="hover:underline"
          >
            GitHub
          </Link>
        </footer>
      </div>
    </main>
  );
}
