import React from "react";

interface ArticleParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export default function ArticleParagraph({ children, className = "" }: ArticleParagraphProps) {
  return (
    <p className={`text-pretty leading-7 ${className}`}>
      {children}
    </p>
  );
}