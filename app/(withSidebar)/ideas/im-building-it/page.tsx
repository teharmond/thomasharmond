import { Metadata } from "next";
import ArticleHeader from "../../../../components/ArticleHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import ArticleList from "@/components/ArticleList";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The missing bridge in Church software",
  description: "Why we need a GitHub for ministry resources",
};

const articles = [
  {
    title: "Churches Need Paper Forms",
    description: "Starting over from first principles to meet real needs",
    link: "/ideas/paper-forms",
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
];

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <ArticleHeader
        title="The missing bridge in Church software"
        description="Why we need a GitHub for ministry resources"
      />

      <ArticleParagraph>
        A few weeks ago, I wrote an article on PCO Home, expressing a few of my
        thoughts on workplace software for churches. I&apos;m going to build it.
      </ArticleParagraph>
      <ArticleParagraph>I want it to have a few key areas:</ArticleParagraph>
      <ArticleList type="unordered">
        <li>
          <span>Project management</span>
        </li>
        <li>
          <span>Chat</span>
        </li>
        <li>
          <span>Calls</span>
        </li>
        <li>
          <span>Documents</span>
        </li>
        <li>
          <span>Courses and trainings</span>
        </li>
        <li>
          <span>Courses and trainings</span>
        </li>
      </ArticleList>

      <div className="bg-muted mt-12 flex flex-col gap-2 rounded-xl p-4">
        <h3 className="px-2 text-xl font-bold">More</h3>
        {articles.map((article, index) => (
          <a
            href={article.link}
            className="rounded-md px-2 py-1 font-medium text-pretty transition-colors hover:bg-blue-100 hover:text-blue-600"
            key={index}
          >
            <h2>{article.title}</h2>
            <p className="text-muted-foreground text-sm font-light">
              {article.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
