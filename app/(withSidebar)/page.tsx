import { Button } from "@/components/ui/button";
import CopyEmailButton from "@/components/copy-email-button";
import Link from "next/link";
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  NpmIcon,
  ChurchkitIcon,
  RaycastIcon,
  Flowforthsvg,
} from "@/components/icons";

const projects = [
  {
    svg: <Flowforthsvg className="h-4.5 w-4.5" />,
    title: "Flowforth",
    link: "https://flowforth.co",
  },
  {
    svg: <RaycastIcon className="h-4.5 w-4.5" />,
    title: "PCO Docs Raycast Extension",
    link: "https://www.raycast.com/thomas.harmond/planning-center-api-docs",
  },
  {
    svg: <NpmIcon className="h-4.5 w-4.5" />,
    title: "PCO NPM Package (work-in-progress)",
    link: "https://github.com/teharmond/planning-center-api",
  },
  {
    svg: <ChurchkitIcon className="h-4.5 w-4.5" />,
    title: "churchkit (work-in-progress)",
    link: "https://churchkit.io",
  },
];
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
    <div className="flex flex-col gap-12">
      {/* <div className="flex gap-2">
        <Link href="https://cal.com/thomasharmond/30-min">
          <Button className="h-9 cursor-pointer rounded-full bg-black px-4 text-white hover:bg-black/80">
            Schedule call
          </Button>
        </Link>

        <CopyEmailButton />
      </div> */}
      <div className="flex flex-col gap-2">
        <h2 className="px-2 text-2xl font-bold">Projects</h2>
        <div className="flex flex-col gap-px">
          {projects.map((project, index) => (
            <a href={project.link} key={index} target="_blank">
              <div
                className={cn(
                  "bg-muted flex cursor-pointer items-center gap-2 p-2 px-3 transition-colors duration-200 hover:bg-blue-100",
                  index === 0 && "rounded-t-lg rounded-b-xs",
                  index === projects.length - 1 && "rounded-t-xs rounded-b-lg",
                  index > 0 && index < projects.length - 1 && "rounded-xs",
                )}
              >
                {project.svg}
                {project.title}
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="px-2 text-2xl font-bold">Ideas</h2>
        <div className="flex flex-col gap-2">
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
      </div>
    </div>
  );
}
