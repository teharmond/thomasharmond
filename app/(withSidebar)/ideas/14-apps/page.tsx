import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import ArticleList from "../../../../components/ArticleList";
import { Metadata } from "next";

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
];

export const metadata: Metadata = {
  title: "My Stack",
  description: "What I used to build Church Space",
};

export default function page() {
  return (
    <div className="px-2 gap-4 flex flex-col">
      <ArticleHeader
        title="Do I really need 14 apps to join the team?"
        description="Who’s going to build Notion for Churches?"
      />
      <ArticleParagraph>
        One day when guiding a new volunteer through onboarding, I realized I
        was about to tell this person they need 14 apps/accounts to be a key
        leader on the team.
      </ArticleParagraph>
      <ArticleList type="unordered">
        <li>
          <span>
            A volunteer email address for communicating with congregants
          </span>
        </li>
        <li>
          <span>The Microsoft Teams app for team communications</span>
        </li>
        <li>
          <span>Thinkific to go through team training</span>
        </li>
        <li>
          <span>
            A separate training platform for a course from our church&apos;s
            compliance team
          </span>
        </li>
        <li>
          <span>Planning Center Services for rosters and service plans</span>
        </li>
        <li>
          <span>Church Center for small groups</span>
        </li>
        <li>
          <span>Planning Center Groups for managing the small group</span>
        </li>
        <li>
          <span>A YouTube account for being on the online chat team</span>
        </li>
        <li>
          <span>Facebook for larger global community groups</span>
        </li>
        <li>
          <span>Zoom for online events</span>
        </li>
        <li>
          <span>Formstack for submitting and reviewing reports</span>
        </li>
        <li>
          <span>
            Slack for communicating with the Digital team who preferred it over
            MS Teams (can&apos;t blame them)
          </span>
        </li>
        <li>
          <span>Front for pastoral care communications</span>
        </li>
        <li>
          <span>ClickUp for project management</span>
        </li>
      </ArticleList>
      <ArticleParagraph>
        Now, some of this reflects the fact that we were a digital ministry and
        part of a much larger system. And some of it could’ve been trimmed down.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        But while this may be an extreme example, it’s not uncommon to have to
        ask volunteers to set up a digital workshop before they interact with
        people. Kids volunteers need Services, Check-ins, Church Center,
        training, and a background check. Production team members need Services,
        ProPresenter, training, and a group chatting platform.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I don’t think there’s a way to eliminate the needs that these many apps
        are fulfilling, but I do think we can mitigate it.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        The core part of all of these tools are communication, project
        management, and knowledge management. (That or it’s built into Planning
        Center which is at least under one login.)
      </ArticleParagraph>
      <ArticleParagraph>
        What we need is a platform like Notion for churches. An all-in-one
        platform that let’s the team work together, go through content, manage
        information, track projects, and manage communication.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        We need a one-login experience for anyone in our church to be involved.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        We need it to link with all the data we already have. That means it
        needs to be built into Planning Center or built around it with their
        API. The question is, who will build it?
      </ArticleParagraph>

      <div className="flex flex-col gap-2 bg-muted p-4 rounded-xl mt-12">
        <h3 className="text-xl font-bold px-2">More</h3>
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
    </div>
  );
}
