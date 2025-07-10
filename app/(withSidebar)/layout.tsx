import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      <div className="w-full max-w-2xl flex flex-col py-12 md:py-24 gap-12 mx-auto px-4">
        <header className="flex flex-col">
          <a href="/" className=" font-medium ">
            Thomas Harmond
          </a>
          <div className=" text-muted-foreground ">
            <div className="flex items-center gap-1">
              <p>This is my notebook.</p>
              <div className="h-5 w-1 rounded-full bg-muted-foreground animate-blink duration-1500" />
            </div>
          </div>
        </header>

        {children}
      </div>
    </main>
  );
}
