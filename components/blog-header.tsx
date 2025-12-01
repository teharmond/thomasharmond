"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function BlogHeader() {
  const pathname = usePathname();
  return (
    <header className="flex flex-col px-2 font-mono">
      <Link href="/" className="flex items-center gap-3 font-medium">
        {pathname === "/" && (
          <Image
            src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/profile%20picture.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="bg-muted h-11.5 w-11.5 rounded-full object-cover"
          />
        )}
        <div className="flex flex-col">
          Thomas Harmond
          <div className="text-muted-foreground">
            <div className="flex items-center gap-1">
              <p>This is my notebook.</p>
              <div className="animate-blink h-5 w-1 rounded-full bg-blue-500" />
            </div>
          </div>
        </div>
      </Link>
    </header>
  );
}
