import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="p-8 font-mono text-sm flex flex-col gap-4 max-w-xl">
      <div className="text-xl font-bold">Thomas Harmond</div>
      <div className="flex flex-col ">
        <Link
          className="text-blue-500 font-semibold underline"
          href="https://trivo.app"
        >
          Trivo
        </Link>
        <div className="text-sm ">
          Trivo helps churches and non-profits engage their people and manage
          their ministries so they can focus on what matters most.
        </div>
      </div>

      <div className="flex flex-col ">
        <Link className="text-blue-500 underline font-semibold" href="/blog">
          Blog
        </Link>
        <div className="text-sm ">Some of my thoughts and ideas.</div>
      </div>
      <div className="flex flex-col ">
        <Link
          className="text-blue-500 underline font-semibold"
          href="/word-count"
        >
          Word Count
        </Link>
        <div className="text-sm ">
          A word count tool that analyzes the length of your sentences and tells
          you how long it will take to present.
        </div>
      </div>
    </div>
  );
}
