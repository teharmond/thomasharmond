import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import Link from "next/link";
import Image from "next/image";
import ArticleParagraph from "@/components/ArticleParagraph";
import SectionHeader from "@/components/SectionHeader";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Metadata } from "next";
import ArticleList from "@/components/ArticleList";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "PCO Content Editor | Thomas Harmond",
  description:
    "How a well-crafted content editor could transform Planning Center",
};

const articles = [
  {
    index: 0,
    title: "PCO Home Meeting",
    description: "Notes from meeting with Evan.",
    link: "/unlisted/pco-home-meeting",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/pco-empty-space.png",
  },
  {
    index: 1,
    title: "On Planning Center Home",
    description: "The meta-layer of Planning Center",
    link: "/ideas/pco-home",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/test/pco-home-header.png",
  },
  {
    index: 2,
    title: "Do I really need 14 apps to join the team?",
    description: "Who’s going to build Notion for Churches?",
    link: "/ideas/14-apps",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/test/14-apps-header.png",
  },
  {
    index: 3,
    title: "The missing bridge in Church software",
    description: "Why we need a GitHub for ministry resources",
    link: "/ideas/missing-bridge",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//church-connections.png",
  },
  {
    index: 4,
    title: "Churches Need Paper Forms",
    description: "Starting over from first principles to meet real needs",
    link: "/ideas/paper-forms",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-builder.png",
  },
  {
    index: 5,
    title: "Answer questions that bring you joy",
    description: "A simple heuristic for the next step",
    link: "/ideas/questions-that-bring-joy",
  },
  {
    index: 6,
    title: "Why I don’t like prayer request forms",
    description: "The pastoral implications of our technical choices",
    link: "/ideas/prayer-request-forms",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//prayer-flow.png",
  },

  {
    index: 7,
    title: "Notes on Craft and Quality",
    description: "The companies that have helped me shape Church Space",
    link: "/ideas/craft-and-quality",
    image:
      "https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//campsite.png",
  },
];

const previewCard = (
  articles: {
    title: string;
    description: string;
    link: string;
    image?: string;
  }[],
) => {
  return (
    <div className="my-4 flex flex-col gap-2">
      <div className="text-muted-foreground text-sm font-semibold">Related</div>
      <div className="flex flex-col gap-2">
        {articles.map((article, index) => (
          <Link
            href={article.link}
            key={index}
            className="hover:text-primary hover:border-border flex h-20 w-full items-center gap-3 rounded-r-md border-l-0 border-transparent p-2 px-3"
          >
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                width={1000}
                height={1000}
                className="aspect-video h-14 w-auto rounded-md object-contain group-hover:rounded-r-none sm:h-20"
              />
            ) : (
              <div className="bg-muted aspect-video h-14 rounded-md group-hover:rounded-r-none sm:h-20"></div>
            )}
            <div className="flex w-full flex-col justify-center">
              <h2 className="font-bold">{article.title}</h2>
              <p className="text-muted-foreground text-sm">
                {article.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <ArticleHeader
        title="PCO Content Editor"
        description="How a well-crafted content editor could transform Planning Center"
      />
      <Collapsible className="bg-muted group my-4 rounded-md border">
        <CollapsibleTrigger className="bg-muted group-hover:text-primary data-[state=open]:text-primary flex w-full items-center justify-between gap-2 rounded-md p-3 px-4">
          <h2 className="text-lg font-semibold">TLDR</h2>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="p-2 px-3 pb-4">
          <ArticleList type="unordered">
            <li>
              Planning Center should create a block-based content editor that
              could be used to improve existing features (forms, pages, tasks,
              etc.) and create new use cases (email, wikis, courses, etc.).
            </li>
            <li>
              I&apos;ve already built part of this with Flowforth and have put
              together demos of what it could look like in Planning Center.
            </li>
            <li>
              I&apos;d love to join the Planning Center team and build this from
              within rather than building this as a third-party product.
            </li>
          </ArticleList>
        </CollapsibleContent>
      </Collapsible>

      <ArticleParagraph>
        I&apos;ve written elsewhere about{" "}
        <Link
          href="/unlisted/pco-home-meeting"
          className="hover:text-primary underline"
          target="_blank"
        >
          my love for Planning Center
        </Link>
        ,{" "}
        <Link
          href="/ideas/14-apps"
          className="hover:text-primary underline"
          target="_blank"
        >
          my desire for all-in-one-apps
        </Link>
        , and what I think would make{" "}
        <Link
          href="/ideas/pco-home"
          className="hover:text-primary underline"
          target="_blank"
        >
          PCO Home even better
        </Link>
        . All the while I&apos;ve been busy building a product of my own:{" "}
        <Link
          href="https://flowforth.com"
          className="hover:text-primary underline"
          target="_blank"
        >
          Flowforth
        </Link>
        .
      </ArticleParagraph>
      <ArticleParagraph>
        It&apos;s been fun solving a real need for churches and doing it in a
        way that saves churches money — sometimes hundreds of dollars a month.
        However, as I think more about the future, I realize that{" "}
        <Link
          href="/ideas/questions-that-bring-joy"
          className="hover:text-primary underline"
          target="_blank"
        >
          the joy for me
        </Link>{" "}
        isn&apos;t building a company, it&apos;s building products that serve
        churches. While this does take a company, the more I think about it, the
        more I realize it doesn&apos;t have to be <i>my</i> company. In fact, I
        think{" "}
        <Link
          href="/ideas/14-apps"
          className="hover:text-primary underline"
          target="_blank"
        >
          the more tools that live in one app
        </Link>
        , the better it serves churches.
      </ArticleParagraph>
      <ArticleParagraph>
        So, here&apos;s my pitch to join Planning Center and build a content
        tool from within.
      </ArticleParagraph>

      {/* first three articles */}
      {previewCard([articles[0], articles[1], articles[2]])}

      <SectionHeader>01. THE PROBLEM</SectionHeader>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/behind%20pco.png"
        alt="Multiple apps behind a Planning Center logo"
        width={1000}
        height={1000}
        className="rounded-md"
      />
      <ArticleParagraph>
        Pitching Planning Center is easy: it&apos;s the well-crafted, all-in-one
        app for our church. The team is bought in, our church signs up, and we
        start rolling it out.
      </ArticleParagraph>
      <ArticleParagraph>And then the promise fades.</ArticleParagraph>
      <ArticleParagraph>
        Lurking behind all that Planning Center offers are multiple apps that we
        still need, many of which don&apos;t integrate with the new digital core
        of our church. We <i>still</i> need an email tool, <i>still</i> need a
        way to create and host small group content and courses, and <i>still</i>{" "}
        need extra tools to help our team collaborate and work together.
      </ArticleParagraph>
      <ArticleParagraph>
        The dream of telling my volunteers they can do it all with one app meets
        the reality of needing ten to get the job done.
      </ArticleParagraph>
      <ArticleParagraph>
        Insert the pain of helping people reset their passwords, teaching them
        where to look for what, and getting all the data in one place.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">There has to be something better.</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        And yet, I understand why Planning Center wouldn&apos;t want to build
        this wide set of tools. I mean, what&apos;s an email tool have to do
        with an LMS? And what&apos;s a team wiki have to do with a course?
      </ArticleParagraph>
      <SectionHeader>01. THE SOLUTION</SectionHeader>
      <ArticleParagraph>
        I believe the solution is creating a{" "}
        <mark>universal drag and drop editor</mark> built on top of{" "}
        <Link
          href="https://tiptap.dev"
          className="hover:text-primary underline"
          target="_blank"
        >
          Tiptap
        </Link>{" "}
        that is modular enough for multiple contexts while staying familiar
        enough across all use cases.
      </ArticleParagraph>
      <ArticleParagraph>
        The editor should live in a <mark>single package</mark> that can be used
        across every repo. It should be designed for multiple use cases. In some
        instances, it should have a sidebar that lets you drag and drop blocks
        and change block settings. This is great for designing emails, building
        forms, creating publishing pages, and for creating small group content
        and courses. In other instances, it should feel like a text editor,
        perfect for team wikis, task descriptions, and quick emails sent to
        lists.
      </ArticleParagraph>
      <ArticleParagraph>
        The editor should also be <mark>block-based</mark>, similar to Notion
        and the many apps that have adopted this design pattern. This not only
        is increasingly familiar to people, but it also allows the editor to be
        reused. You can have a set of content blocks (text, images, videos,
        etc.), form block (inputs, dropdowns, checkboxes, etc.), and interaction
        blocks (buttons, links, etc.).
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/editor.gif"
        alt="PCO Publishing Editor"
        width={1000}
        height={1000}
        className="rounded-md"
      />
      <div className="bg-muted text-muted-foreground w-full rounded-md p-2 px-3 text-xs">
        Screen recording of the current Flowforth editor.
      </div>
      <ArticleParagraph>
        Another benifit of this style editor is that it increases{" "}
        <mark>accessibility</mark>. If someone can&apos;t drag and drop a block,
        they can still type{" "}
        <KbdGroup>
          <Kbd>/</Kbd>
        </KbdGroup>{" "}
        to open the command palette and add a block that way and use key
        commands to reorder blocks.
      </ArticleParagraph>
      <ArticleParagraph>
        All of this goes to the next level when you start to take advantage of
        all your data being in Planning Center. You can <mark>@ mention</mark> a
        Services plan and a few songs in a task description to quickly access
        what you&apos;re working on. You can{" "}
        <KbdGroup>
          <Kbd>@</Kbd>
        </KbdGroup>{" "}
        mention a workflow in a wiki so you can know what the process is
        referencing. You could even{" "}
        <KbdGroup>
          <Kbd>@</Kbd>
        </KbdGroup>{" "}
        mention content in messages to quickly share a sermon with your small
        group leaders.
      </ArticleParagraph>
      <div className="overflow-hidden rounded-md border shadow-sm">
        <video
          src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/mentions.mp4"
          controls
          playsInline
          className="aspect-[1448/1080] w-full bg-black"
        />
      </div>
      <div className="bg-muted text-muted-foreground w-full rounded-md p-2 px-3 text-xs">
        @ mentioning demo I put together for Evan a few months ago. You can view
        a similar demo I built here:{" "}
        <Link
          href="https://pcohome.thomasharmond.com"
          className="hover:text-primary underline"
          target="_blank"
        >
          PCO Home Mockup
        </Link>
        .
      </div>
      <ArticleParagraph>
        Finally, making the editor <mark>realtime</mark> means that I no longer
        need Services and Google Docs open in a service planning meeting. I can
        simple open Planning Center along with the rest of my team and work
        together seamlessly.
      </ArticleParagraph>

      <SectionHeader>02. USE CASES</SectionHeader>
      <ArticleParagraph>
        This improves what already exists in Planning Center — People Forms,
        Publishing Pages, Home Tasks, and more — but it also starts to solve the
        aforementioned &quot;lurking apps&quot; problem. Let&apos;s look at a
        few new use cases.
      </ArticleParagraph>
      <div className="mx-2 mt-10 flex items-center gap-2">
        <Image
          src="/people.png"
          alt="Planning Center People"
          width={24}
          height={24}
        />
        <h3 className={`w-full font-mono text-xl font-semibold`}>EMAIL</h3>
      </div>
      <ArticleParagraph>
        I think a lot of the features I&apos;ve built for Flowforth have their
        proper place in Planning Center. Things like using custom fields as
        merge tags, importing content from Calendar, Groups, and Registrations
        directly into an email so you don&apos;t have to redo work, and adding
        conditional blocks based on other lists a person is on. This is all
        possible with this editor package and some small changes to how email
        already works in Planning Center.
      </ArticleParagraph>
      <ArticleParagraph>
        Adding this moves all the data back into Planning Center. Having email
        data — opens, unsubscribes, and so on — in Planning Center puts valuable
        pastoral info back into the system for people to be better cared for by
        their church based on their engagement (or lack there of).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I also believe adding custom emails makes every product in Planning
        Center better. You can have custom Giving emails after someone donates,
        custom Registrations emails when someone signs up for an event, custom
        Calendar emails to send people a feed of what&apos;s coming up, and
        custom People emails for everything from workflows to forms. One editor
        unlocks a lot of possibility.{" "}
      </ArticleParagraph>
      <div className="mx-2 mt-10 flex items-center gap-2">
        <Image
          src="/home.png"
          alt="Planning Center People"
          width={24}
          height={24}
        />
        <h3 className={`w-full font-mono text-xl font-semibold`}>WIKIS</h3>
      </div>
      <ArticleParagraph>
        As mentioned in my{" "}
        <Link
          href="/ideas/pco-home"
          className="hover:text-primary underline"
          target="_blank"
        >
          PCO Home article
        </Link>
        , having wikis would make it easier to work within Planning Center on
        the day to day. It would allow us to store processes and procedures
        (like a staff hub), it would let us keep mood boards and service ideas
        so that people are ready to go when Easter planning roles around, and it
        would link knowlege managment with church management unlocking
        connections not before possible.
      </ArticleParagraph>
      <ArticleParagraph>
        These wikis could then be linked throughout PCO. You could attach one to
        a Services plan to keep everyone aligned to the vision for the service.
        You can add one to a workflow to help volunteers know what to do if
        [blank] comes up in an email chain. You could attach them to a task list
        so that we know the end goal of the project.
      </ArticleParagraph>

      <div className="mx-2 mt-10 flex items-center gap-2">
        <Image
          src="/publishing.png"
          alt="Planning Center People"
          width={24}
          height={24}
        />
        <h3 className={`w-full font-mono text-xl font-semibold`}>
          COURSES AND SMALL GROUP CONTENT (LMS)
        </h3>
      </div>
      <ArticleParagraph>
        Every church I&apos;ve been a part of has made me sign up for a
        different service in order to do training and onboarding. Imagine if
        this lived in PCO? Not just for the sake of me having one less login,
        but also so it&apos;s easier for the church to know when I&apos;ve
        completed the training. Churches could also automate training
        assignments so that when someone joins a team, they get invited to a
        course right away. You could even tie this into a workflow to have the
        full onboarding process all in one place.
      </ArticleParagraph>
      <ArticleParagraph>
        I think the core builder could be taken further here to things like
        small group content. Rather than having to link to an external site or a
        PDF, churches can create their content in Planning Center and assign
        that content to different Groups or even have an open library for group
        leaders to chose material from. The same editor can be used to create
        both digital and paper guides using tools like{" "}
        <Link
          href="https://react-pdf.org"
          className="hover:text-primary underline"
          target="_blank"
        >
          React PDF
        </Link>{" "}
        to convert the page to something that looks great in print.
      </ArticleParagraph>
      {/* next two articles */}
      {previewCard([articles[3], articles[4]])}
      <SectionHeader>03. MONETIZATION</SectionHeader>
      <ArticleParagraph>
        I don&apos;t think my actual pricing is perfect, but I think the model
        is one that serves churches better. Rather than charge per subscriber
        like Mailchimp (something that is antithetical to People being free),
        charge for the organization&apos;s send limit. If you need 10,000 email
        sends per month, just pay for 10,000. If you need to go over, buy some
        extra credits so you don&apos;t have to fully upgrade to a new
        plan.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        With the LMS, you could charge based on a course limit. This lets you
        distribute the course to various teams and groups without worrying about
        how many people need it over time. This model works better due to the
        fact that most congregants will do a training and then not need the
        module again for months, but their data showing completion will still
        matter.
      </ArticleParagraph>
      <ArticleParagraph>
        Finally, you could offer a &quot;teams&quot; plan that could combine
        one-to-one messaging with wikis and an advanced version of tasks.
      </ArticleParagraph>
      <SectionHeader>04. WHY ME?</SectionHeader>

      <ArticleList type="unordered">
        <li>
          I have a deep understanding of what it&apos;s like to use Planning
          Center at multiple types of churches. I started using it when I worked
          at a small mobile church plant when I was a kid. I then helped roll it
          out at Hillsong Online and Hillsong Australia. This included building
          internal tools on top of the API. I then used it at a mid-sized
          Methodist church in Houston, TX. Now I&apos;m helping the church I
          attend use it to its full potential.
        </li>
        <li>
          I work for a company helping churches migrate their data to Planning
          Center from other systems while building tools for these churches. I
          understand their pain points and how to solve them.
        </li>
        <li>
          I&apos;ve built Flowforth end-to-end by myself. I&apos;ve worked with
          real users, use Tiptap in production, and understnad what people are
          wanting in a content tool for churches.
        </li>
        <li>
          I&apos;ve used and deeply understand prodcuts like Notion, ClickUp,
          Monday.com, Thinkific, Circle, and more. I know what&apos;s great
          about them and what the common pain points are. This knowedlge has
          helped me outline what to build in this space specifically for
          churches.
        </li>
      </ArticleList>

      <SectionHeader>05. CONCLUSION</SectionHeader>
      <ArticleParagraph>
        I love Planning Center, and I&apos;ve loved building tools around it.
        But it would be a dream to build from within and to build something
        that&apos;s been a need for me consistently at the past 4 churches that
        I&apos;ve been involved with, both big and small.{" "}
      </ArticleParagraph>

      <ArticleParagraph>
        If you&apos;re interested in any of this, I&apos;d love to chat more.
        You can reach me at{" "}
        <Link
          href="mailto:hey@thomasharmond.com"
          className="hover:text-primary underline"
          target="_blank"
        >
          hey@thomasharmond.com
        </Link>
        or at the email I&apos;ve attachedk this article to. Thank you for all
        you do for the church and for making ministry that much smoother.{" "}
      </ArticleParagraph>

      {/* lsat two articles */}
      {previewCard([articles[5], articles[6], articles[7]])}
    </div>
  );
}
