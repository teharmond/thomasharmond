import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import Link from "next/link";
import Image from "next/image";
import ArticleParagraph from "@/components/ArticleParagraph";
import SectionHeader from "@/components/SectionHeader";

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
        title="PCO Publishing | July 23, 2025"
        description="Thoughts on PCO Publishing"
      />
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
        way that saves churches money—sometimes hundreds of dollars a month.
        However, as I think more about the future, I realize that{" "}
        <Link
          href="/ideas/questions-that-bring-joy"
          className="hover:text-primary underline"
          target="_blank"
        >
          the joy for me
        </Link>{" "}
        isn&apos;t building a company, it&apos;s building products that serve
        churches. While this does take a company, the more and more I think
        about what brings me joy the more I realize that it doesn&apos;t have to
        be <i>my</i> company. In fact, I think{" "}
        <Link
          href="/ideas/14-apps"
          className="hover:text-primary underline"
          target="_blank"
        >
          the more tools that live in one app
        </Link>
        , the better it serves the churches.
      </ArticleParagraph>
      <ArticleParagraph>
        So, here&apos;s my pitch to join Planning Center and build a content
        tool from within.{" "}
      </ArticleParagraph>

      {/* first three articles */}
      {previewCard([articles[0], articles[1], articles[2]])}
      <SectionHeader>01. THE PROBLEM</SectionHeader>
      <ArticleParagraph>
        A gap that I regularly feel as a customer of Planning Center is that
        there is not a great solution for content. Designed emails, team wikis,
        courses, and so on all require separate tools external to Planning
        Center.
      </ArticleParagraph>
      <ArticleParagraph>
        Having to do this in other services is frustrating for two reasons.
        First, we have to ask our people to download extra apps, get extra
        logins, and learn other tools. It makes joining a team a lot harder than
        it should be. Second, we have to either manually import information or
        build custom solutions on top of the API to sync the data (and pray we
        don&apos;t get hundreds of duplicates). For smaller churches, this is
        next to impossible.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">There has to be something better.</mark>
      </ArticleParagraph>
      <SectionHeader>01. THE SOLUTION</SectionHeader>
      <ArticleParagraph>
        The three core content pieces missing from Planning Center are an email
        marketing tool, an learning management system (LMS), and team wikis.
      </ArticleParagraph>
      <ArticleParagraph>
        I believe creating a universal editor with an optional drag and drop
        sidebar built on top of{" "}
        <Link
          href="https://tiptap.dev"
          className="hover:text-primary underline"
          target="_blank"
        >
          Tiptap
        </Link>{" "}
        would be a key first step to solving the problem while also adding a lot
        of value to every area of Planning Center. Having this reusable package
        would help improve things like the People form editor or the Publishing
        pages editor. It can be taken further to include blog posts, improved
        Tasks descriptions (complete with @ mentioning any entity in Planning
        Center), or even a full website builder.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        This one package would take all content within Planning Center to the
        next level.{" "}
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
      <h3
        className={`text-primary mx-2 mt-10 w-full font-mono text-xl font-bold`}
      >
        EMAIL
      </h3>
      <ArticleParagraph>
        I think a lot of the features I&apos;ve built for Flowforth have their
        proper place in Planning Center. Things like using custom fields as
        merge tags, importing content from Calendar, Groups, and Registrations
        directly into an email so you don&apos;t have to redo work, and adding
        conditional blocks based on other lists a person is on.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Additionally, having all of the email data — opens, unsubscribes, and so
        on — in Planning Center puts valuable pastoral info back into the system
        for people to be better cared for by their church based on their
        engagement (or lack there of).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I also believe adding custom emails makes every product in Planning
        Center better. You can have custom Giving emails after someone donates,
        custom Registrations emails when someone signs up for an event, custom
        Calendar emails to send people a feed of what&apos;s coming up, and
        custom People emails for everything from workflows to forms. One editor
        unlocks a lot of possibility.{" "}
      </ArticleParagraph>
      <h3
        className={`text-primary mx-2 mt-10 w-full font-mono text-xl font-bold`}
      >
        WIKIS
      </h3>
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
        (like a staff hub). It would let us keep mood boards and service ideas
        so that people are ready to go when Easter planning roles around.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        These wikis could then be linked through PCO. You could attach one to a
        Services plan to keep everyone aligned to the vision for the service.
        You can add one to a workflow to help volunteers know what to do if
        [blank] comes up in an email chain. You could attach them to a task list
        so that we know the end goal of the project.{" "}
      </ArticleParagraph>
      <h3
        className={`text-primary mx-2 mt-10 w-full font-mono text-xl font-bold`}
      >
        LMS
      </h3>
      <ArticleParagraph>
        Every church I&apos;ve been a part of has made me sign up for a
        different service in order to do training and onboarding. Imagine if
        this lived in PCO? Not just for the sake of me having one less login,
        but also so it&apos;s easier for the church to know when I&apos;ve
        completed the training. Churches could also automate training
        assignments so that when someone joins a team, they get invited to a
        course right away. You could even tie this into a workflow to have the
        true onboading process all in one place.
      </ArticleParagraph>
      <ArticleParagraph>
        I think the core builder could be taken further here to things like
        small group content. Rather than having to link to an external site or a
        PDF, churches can create their content in Planning Center and assign
        that content to different Groups or even have an open library for group
        leaders to chose material from. The same editor can be used to create
        both digital and paper guides using tools like React PDF to convert the
        page to something that looks great in print.
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
      <SectionHeader>04. CONCLUSION</SectionHeader>
      <ArticleParagraph>
        I love Planning Center, and I&apos;ve loved building tools around it.
        But it would be a dream to build from within and to build something
        that&apos;s been a need for me consistently at the past 4 churches that
        I&apos;ve been involved with, both big and small.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I have more fleshed out roadmaps and plenty of demos if this is
        something you&apos;re even remotely interested in.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Thank you for all you do for the church and for making ministry that
        much smoother.{" "}
      </ArticleParagraph>

      {/* lsat two articles */}
      {previewCard([articles[5], articles[6], articles[7]])}
    </div>
  );
}
