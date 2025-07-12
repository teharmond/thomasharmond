import React from "react";

const articles = [
  {
    title: "My Stack",
    description: "What I used to build Church Space",
    link: "/ideas/my-stack",
  },
  // {
  //   title: "On Planning Center Home",
  //   description: "The missing piece of Planning Center",
  //   link: "/ideas/pco-home",
  // },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold px-2">Ideas</h1>
      {articles.map((article) => (
        <a
          href={article.link}
          className="text-pretty hover:bg-blue-100 font-medium hover:text-blue-600 px-2 py-1 rounded-md transition-colors"
        >
          <h2>{article.title}</h2>
          <p className="text-sm text-muted-foreground font-light">
            {article.description}
          </p>
        </a>
      ))}
    </div>
  );
}
