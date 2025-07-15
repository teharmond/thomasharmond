import React from "react";
import Substack from "@/components/substack";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="w-full max-w-2xl flex flex-col pt-12 md:pt-24 gap-12 mx-auto px-2">
        <header className="flex flex-col px-2 font-mono">
          <a href="/" className=" font-medium ">
            Thomas Harmond
          </a>
          <div className=" text-muted-foreground ">
            <div className="flex items-center gap-1">
              <p>This is my notebook.</p>
              <div className="h-5 w-1 rounded-full bg-primary animate-blink duration-1500" />
            </div>
          </div>
        </header>

        {children}
        <Substack />
        <footer className="text-xs text-muted-foreground my-12 flex  gap-3 px-2">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="/about" className="hover:underline">
            About
          </a>
          <span className="text-muted-foreground">|</span>
          <a href="mailto:hey@thomasharmond.com" className="hover:underline">
            hey@thomasharmond.com
          </a>
        </footer>
      </div>
    </main>
  );
}
