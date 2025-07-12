import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeader({ children, className = "" }: SectionHeaderProps) {
  return (
    <h2 className={`text-red-500 text-sm px-1.5 rounded-md bg-zinc-200 dark:bg-zinc-800 w-fit ${className}`}>
      {children}
    </h2>
  );
}