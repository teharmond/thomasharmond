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
          className="mt-10 px-2 hover:bg-primary/10 rounded-md group"
        >
          <h2
            className={`text-primary justify-between flex items-center gap-2 w-full border-secondary font-bold border-b group-hover:border-transparent  text-2xl ${className}`}
          >
            {children}
            <ExternalLink className="w-4 h-4" />
          </h2>
        </Link>
      ) : (
        <h2
          className={` mx-2 text-primary border-secondary font-bold border-b w-full  text-2xl mt-10 ${className}`}
        >
          {children}
        </h2>
      )}
    </>
  );
}
