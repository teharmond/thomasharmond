import React from "react";

const articles = [
  {
    title: "Crafting Delight",
    description: "On creating software magic.",
    link: "/ideas/crafting-delight",
  },
  {
    title: "The missing bridge in Church software",
    description: "Why we need a GitHub for ministry resources",
    link: "/ideas/missing-bridge",
  },
  {
    title: "Churches Need Paper Forms",
    description: "Starting over from first principles to meet real needs",
    link: "/ideas/paper-forms",
  },
  {
    title: "Answer questions that bring you joy",
    description: "A simple heuristic for the next step",
    link: "/ideas/questions-that-bring-joy",
  },
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
    title: "Notes on Craft and Quality",
    description: "The companies that have helped me shape Church Space",
    link: "/ideas/craft-and-quality",
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
      <h1 className="px-2 text-3xl font-bold">Ideas</h1>
      {articles.map((article, index) => (
        <a
          href={article.link}
          className="group rounded-md px-2 py-1 font-medium text-pretty transition-colors duration-200 hover:bg-blue-100"
          key={index}
        >
          <h2 className="transition-colors group-hover:text-blue-600">
            {article.title}
          </h2>
          <p className="text-muted-foreground text-sm font-light">
            {article.description}
          </p>
        </a>
      ))}
    </div>
  );
}
