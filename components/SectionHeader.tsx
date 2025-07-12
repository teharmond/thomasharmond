import React from "react";

interface SectionHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  children,
  className = "",
}: SectionHeaderProps) {
  return (
    <h2
      className={`text-primary border-secondary font-bold border-b w-full  text-2xl mt-10 ${className}`}
    >
      {children}
    </h2>
  );
}
