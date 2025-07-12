import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";

export default function page() {
  return (
    <div className="px-2 gap-4 flex flex-col">
      <ArticleHeader
        title="On Planning Center Home"
        description="The missing piece of Planning Center"
      />
      <SectionHeader>01. INTRODUCTION</SectionHeader>
      <ArticleParagraph>
        I recently launched Church Space. Here’s where I landed for my stack.
      </ArticleParagraph>
      <ArticleParagraph>
        PCO is the digital heartbeat of church work. It&apos;s where you plan
        events and services, connect and care for people, and manage your
        resources. It helps centralize information, focus your attention to one
        app, engage your congregation, and simplify things for your team. And in
        theory, it connects datapoints previously disconnected in order to
        better care for your congregation.
      </ArticleParagraph>
      <ArticleParagraph>
        And yet, in my experience, I&apos;ve never been able to see the latter
        happen in a significant way. Data is inaccurate and hard to make sense
        of and the tools offered fall short of what&apos;s needed.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        When Planning Center Home was announced in 2021, it clicked for me that
        this can be the solution.{" "}
      </ArticleParagraph>
      <SectionHeader className="mt-10">02. DATA INPUT</SectionHeader>
      <ArticleParagraph>
        You can have the best analytics tools in the world with the brightest
        team working on them, but if the data you&apos;re looking at is wrong,
        your effort is in vain.{" "}
      </ArticleParagraph>

      <ArticleParagraph>
        My biggest gripe with PCO from a pastoral standpoint is that there
        isn&apos;t an easy <mark>tool for quick capture</mark>.
      </ArticleParagraph>
      <ArticleParagraph>
        If a greeter learns someone&apos;s birthday, they have to get out the
        People app, search for that person, create a profile for that person if
        they don&apos;t have one, click edit, add the birthday, and hit save
        (all before the next guest comes to the door). The same is true when a
        children&apos;s pastor learns a kid&apos;s favorite candy, a worship
        leader is flagged about a potential volunteer, or when a pastor learns
        of passing of a congregant&apos;s close friend.{" "}
      </ArticleParagraph>
      <ArticleParagraph>How can we solve this?</ArticleParagraph>
      <ArticleParagraph>
        I’m pretty skeptical on how much AI should be used in churches. It can
        write your small group guides, your weekly update emails, and your
        website copy. But don’t each one of those things have deep pastoral and
        theological considerations that a Spirit-filled believer should be
        discerning?{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Maybe I’m wrong on that; time will tell. But this is a question that
        will take the church a while to answer (and even longer to come to any
        sort of consensus on).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        But no matter what you think of generative AI, it is the perfect tool
        for helping input and make sense of data.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Imagine a capture tool that lets you use natural language—voice or
        text—to make inputs on the fly. “John Doe’s birthday is on May 15th.”
        “Auditorium door #3 won’t shut all the way.” “Mary Smith just started a
        job at Acme.” “Richard Roe wants to play bass in the band.”{" "}
      </ArticleParagraph>
      <div className="w-full h-96 aspect-video rounded-md bg-zinc-200 "></div>
      <ArticleParagraph>
        Now with these inputs, we can parse them out: John’s birthday can be
        updated right away. A task can be created for the facilities team to fix
        the door. A note is added to Mary’s profile and a reminder is set for a
        pastor to follow up in a two weeks on how the job is going. The worship
        leader is notified to follow up with Richard.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        And if we can’t determine intent, don’t want to trust an auto mode, or
        don’t want to create new profiles from this, we can have an inbox
        waiting for us in the Home app on Monday morning to help parse what
        wasn’t processed. This frees pastors and teams up on a Sunday to engage
        with people without worrying about forgetting valuable pastoral
        information. Quick captures leads to better care.
      </ArticleParagraph>
      <div className="w-full h-96 aspect-video rounded-md bg-zinc-200 "></div>
      <SectionHeader className="mt-10">
        03. REMINDERS, TASKS, AND CARE
      </SectionHeader>
    </div>
  );
}
