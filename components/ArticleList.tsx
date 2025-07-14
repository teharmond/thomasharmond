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
      ? "list-decimal list-outside space-y-2 pl-8"
      : "list-disc list-outside space-y-2 pl-4";
  const indentStyles = indent ? "ml-1" : "";

  return (
    <ListComponent
      className={`text-pretty leading-7 px-2 ${listStyles} ${indentStyles} ${className}`}
    >
      {children}
    </ListComponent>
  );
}
