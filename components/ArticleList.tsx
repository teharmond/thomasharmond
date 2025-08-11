import React from "react";

interface ArticleListProps {
  children: React.ReactNode;
  type?: "ordered" | "unordered";
  className?: string;
  indent?: boolean;
}

export default function ArticleList({
  children,
  type = "unordered",
  className = "",
  indent = false,
}: ArticleListProps) {
  const ListComponent = type === "ordered" ? "ol" : "ul";
  const listStyles =
    type === "ordered"
      ? "list-decimal list-outside space-y-2 pl-8 "
      : "list-disc list-outside space-y-2 pl-6";
  const indentStyles = indent ? "ml-1" : "";

  return (
    <ListComponent
      className={`px-2 leading-7 text-pretty ${listStyles} ${indentStyles} ${className}`}
    >
      {children}
    </ListComponent>
  );
}
