import React from "react";

const articles = [
  {
    title: "On Planning Center Home",
    description: "The meta-layer of Planning Center",
    link: "/ideas/pco-home",
  },
  {
    title: "Why I don’t like prayer request forms",
    description: "The pastoral implications of our technical choices",
    link: "/ideas/prayer-request-forms",
  },
  {
    title: "Do I really need 14 apps to join the team?",
    description: "Who’s going to build Notion for Churches?",
    link: "/ideas/14-apps",
  },
  {
    title: "My Stack",
    description: "What I used to build Church Space",
    link: "/ideas/my-stack",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold px-2">Ideas</h1>
      {articles.map((article, index) => (
        <a
          href={article.link}
          className="text-pretty hover:bg-blue-100 font-medium hover:text-blue-600 px-2 py-1 rounded-md transition-colors"
          key={index}
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
