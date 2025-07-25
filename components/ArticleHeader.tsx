import React from "react";

interface ArticleHeaderProps {
  title: string;
  description: string;
}

export default function ArticleHeader({
  title,
  description,
}: ArticleHeaderProps) {
  return (
    <div className="flex flex-col gap-1 px-2 font-mono">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground text-xl">{description}</p>
    </div>
  );
}
