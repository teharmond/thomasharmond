import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";

import { Metadata } from "next";

const articles = [
  {
    title: "On Planning Center Home",
    description: "The meta-layer of Planning Center",
    link: "/ideas/pco-home",
  },
  {
    title: "My Stack",
    description: "What I used to build Church Space",
    link: "/ideas/my-stack",
  },
];

export const metadata: Metadata = {
  title: "Why I don’t like prayer request forms",
  description: "The pastoral implications of our technical choices",
};

export default function page() {
  return (
    <div className="px-2 gap-4 flex flex-col">
      <ArticleHeader
        title="Why I don’t like prayer request forms"
        description="The pastoral implications of our technical choices"
      />
      <SectionHeader>01. INTRODUCTION</SectionHeader>
      <ArticleParagraph>
        I&apos;ve been at my current church for just over a year. One of my
        favorite things we do as a staff is sit down each Tuesday and pray for
        every single prayer request. It&apos;s a beautiful thing for the whole
        staff to be a part of.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        And how do we collect these prayer requests? A form (both paper and
        digital).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        These forms aren&apos;t necessarily bad, but I think they&apos;re
        missing something.{" "}
      </ArticleParagraph>
      <SectionHeader>02. EVERYTHING IS THEOLOGICAL</SectionHeader>
      <ArticleParagraph>
        Everything we do in ministry is inherently theological.
      </ArticleParagraph>
      <ArticleParagraph>
        Windows in a sanctuary can communicate our lack of control over an
        environment. As light pours in or a cloud dims the room, we remember
        that we have less control than we think we do.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Having Scriptures only on a screen can unintentionally communicate that
        what is being read is isolated and context free. Reading from a pew
        Bible helps the reader remember that there is more going on than just
        what&apos;s being preached.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        These things are small and they aren&apos;t inherently bad. A dark room
        lets you create environments that engage people&apos;s God-given
        emotions like any other form of Christian art is designed to do. Having
        Scriptures on the screen helps people follow along with the teaching who
        might not know where the book of Obadiah is. (Plus, the preacher will
        move on before they get there).
      </ArticleParagraph>
      <ArticleParagraph>
        Not bad things at all. But there is a theological message hidden in
        there.
      </ArticleParagraph>
      <ArticleParagraph>
        So what’s the message with prayer request forms?{" "}
      </ArticleParagraph>
      <SectionHeader>03. AN ATTEMPT</SectionHeader>
      <ArticleParagraph>
        Back when I was at Hillsong, we received thousands of prayer requests
        per month through our online forms. All were routed to the appropriate
        campus or ministry for follow up. From there, a pastor would call them
        or email them back.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        It was a nice system, but I felt like it was missing something. The form
        let us collect information, but{" "}
        <mark>
          no where in the process did we encourage the person requesting prayer
          to engage with God themselves.
        </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        We don&apos;t just need to share a need and ask someone to pray for us
        (though of course we should do this), but we ourselves get to join into
        that moment with our loving Father who wants to meet with us.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Prayer request forms make me think more of my need than my God. It can
        feel more like wishing than engaging in dialectic prayer.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Before leaving Hillsong, I played around with an idea. Instead of a
        simple form on a site, it was a multi-step journey. A time of prayer
        rather than an empty textarea and a blinking cursor.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        You were first invited to pause, quiet your heart, and let God meet you
        in any anxieties you have. This was followed by reading a short
        scripture.
      </ArticleParagraph>
      <ArticleParagraph>
        <span className="italic">Then</span> you would be able to put in your
        prayer request. But before you hit submit, you were asked to pray for
        your own need as well.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        The team would still get all these submissions and be able to follow
        them up, but these small tweaks changed the tone of the whole experience
        from input to encounter.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I also set up some keywords and phrases to listen for any signs that the
        person needed immediate care. If they did, we showed the appropriate
        support hotline number to the person. We wanted to put a resource in a
        person&apos;s hand right away so they didn&apos;t have to wait for a
        pastor reach out (though they would do that as well).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Combine this with another idea someone on the team shipped: a digital
        prayer wall. Now in submitting your request, you had a time of prayer,
        got resources you needed, and you got to engage in prayer for others
        while they did the same for you.
      </ArticleParagraph>
      <ArticleParagraph>
        A prayer form turns into a time of prayer and an act of community.{" "}
      </ArticleParagraph>
      <SectionHeader>04. CONCLUSION</SectionHeader>
      <ArticleParagraph>
        While this didn&apos;t go live before I left staff, I still think
        there&apos;s something to it. If nothing else, it&apos;s a reminder to
        me that{" "}
        <mark>
          seemingly small technical design decisions have theological
          implications.
        </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Digital will never be a 1:1 of an in-person experience. Laying on of
        hands can&apos;t happen through a screen. But that doesn&apos;t dismiss
        the medium as a whole. We just have to be a bit more thoughtful about
        what we build.
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
