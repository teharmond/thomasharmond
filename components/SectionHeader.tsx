import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
  url?: string;
}

export default function SectionHeader({
  children,
  className = "",
  url,
}: SectionHeaderProps) {
  return (
    <>
      {url ? (
        <Link
          href={url}
          target="_blank"
          className="hover:bg-primary/10 group mt-10 rounded-md px-2 font-mono"
        >
          <h2
            className={`text-primary border-secondary flex w-full items-center justify-between gap-2 border-b text-2xl font-bold group-hover:border-transparent ${className}`}
          >
            {children}
            <ExternalLink className="h-4 w-4" />
          </h2>
        </Link>
      ) : (
        <h2
          className={`text-primary border-secondary mx-2 mt-10 w-full border-b font-mono text-2xl font-bold ${className}`}
        >
          {children}
        </h2>
      )}
    </>
  );
}
