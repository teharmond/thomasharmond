import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "On Planning Center Home",
  description: "The meta-layer of Planning Center",
};

const articles = [
  {
    title: "Why I don’t like prayer request forms",
    description: "The pastoral implications of our technical choices",
    link: "/ideas/prayer-request-forms",
  },
  {
    title: "My Stack",
    description: "What I used to build Church Space",
    link: "/ideas/my-stack",
  },
];

export default function page() {
  return (
    <div className="px-2 gap-4 flex flex-col">
      <ArticleHeader
        title="On Planning Center Home"
        description="The meta-layer of Planning Center"
      />
      <SectionHeader>01. INTRODUCTION</SectionHeader>
      <ArticleParagraph>
        I got my first Planning Center Account when I was 11 years old (14 years
        ago!), which means I don&apos;t know what it means to do ministry
        without it. I&apos;ve used it at a small mobile church in Atlanta,
        helped roll it out for Hillsong Church Australia, and now use it
        day-to-day at a mid-sized Methodist church in Houston.
      </ArticleParagraph>
      <ArticleParagraph>
        PCO is the digital heartbeat of church work. It&apos;s where you plan
        events and services, connect and care for people, and manage your
        resources. It helps centralize information, focus your attention to one
        app, engage your congregation, and simplify things for your team. And in
        theory, it connects datapoints previously disconnected in order to
        better care for your congregation and to increase collaboration and
        productivity for church teams.
      </ArticleParagraph>
      <ArticleParagraph>
        And yet, in my experience, I&apos;ve never been able to see the latter
        happen to the degree that I believe is possible. Data is inaccurate and
        hard to make sense of. The tools offered fall short of what&apos;s
        needed.
      </ArticleParagraph>
      <ArticleParagraph>
        But when Planning Center Home was announced in 2021, it clicked for me
        that this can be the solution.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-home-announcement.png"
        alt="Planning Center Home Announcement"
        width={1000}
        height={1000}
      />
      <div className="w-full bg-muted  text-muted-foreground text-xs p-2 px-3 rounded-md">
        From{" "}
        <a
          href="https://www.planningcenter.com/blog/2021/12/introducing-planning-center-home"
          className="underline hover:text-primary "
        >
          Introducing Planning Center Home
        </a>
      </div>
      <SectionHeader>02. DATA INPUT</SectionHeader>
      <ArticleParagraph>
        You can have the best analytics tools in the world with the brightest
        teams working on them, but if the data you&apos;re looking at is wrong,
        your effort is in vain.
      </ArticleParagraph>

      <ArticleParagraph>
        My biggest gripe with PCO from a pastoral standpoint is that there
        isn&apos;t an <mark>easy tool for quick capture.</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        If a greeter learns someone&apos;s birthday, they have to get out the
        People app, search for that person, create a profile for that person if
        they don&apos;t have one, click edit, add the birthday, and hit save
        (all before the next guest comes to the door). The same is true when a
        children&apos;s pastor learns a kid&apos;s favorite candy, a worship
        leader is flagged about a potential volunteer, or when a pastor learns
        of the passing of a congregant&apos;s close friend.
      </ArticleParagraph>
      <ArticleParagraph>How can we solve this?</ArticleParagraph>
      <ArticleParagraph>
        I&apos;m pretty skeptical on how much AI should be used in churches. It
        <span className="italic"> can</span> write your small group guides, your
        weekly update emails, and your website copy. But don&apos;t each of
        those things have deep pastoral and theological considerations that a
        Spirit-filled believer should be discerning?
      </ArticleParagraph>
      <ArticleParagraph>
        Maybe I&apos;m wrong on that; time will tell. But this is a question
        that will take the church a while to answer (and even longer to come to
        any sort of consensus on).
      </ArticleParagraph>
      <ArticleParagraph>
        But no matter what you think of{" "}
        <span className="italic">generative</span> AI, traditional AI is the
        perfect tool for helping input and make sense of data.
      </ArticleParagraph>
      <ArticleParagraph>
        Imagine a capture tool that lets you use natural language—voice or
        text—to make inputs on the fly. &quot;John Doe&apos;s birthday is on May
        15th.&quot; &quot;Auditorium door #3 won&apos;t shut all the way.&quot;
        &quot;Mary Smith just started a job at Acme.&quot; &quot;Richard Roe
        wants to play bass in the band.&quot;
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-capture-mockup.png"
        alt="Planning Center Capture Mobile App Mockup"
        width={1000}
        height={1000}
      />
      <ArticleParagraph>
        We can then parse these inputs out and process them with some basic tool
        calls.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        John&apos;s birthday can be updated right away. A task can be created
        for the facilities team to fix the door. A note is added to Mary&apos;s
        profile and a reminder is set for a pastor to follow up in a two weeks
        on how the job is going. The worship leader is notified to follow up
        with Richard.
      </ArticleParagraph>
      <ArticleParagraph>
        And if we can’t determine intent, don&apos;t want to trust an auto mode,
        or don&apos;t want to create new profiles from this, we can have an{" "}
        <mark>inbox</mark> waiting for us in the Home app on Monday morning to
        help parse what wasn&apos;t processed. This frees pastors and teams up
        on a Sunday to engage with people without worrying about forgetting
        valuable pastoral information. Quick captures leads to better care.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-capture-inbox.png"
        alt="Planning Center Capture Inbox Mockup"
        width={1000}
        height={1000}
        className="mb-10"
      />
      <SectionHeader>03. REMINDERS, TASKS, AND CARE</SectionHeader>
      <ArticleParagraph>
        A tasks app is great for working on, well, tasks. A CRM is great for
        managing relationships. But ministry work is never one or the other, so
        a great task app for churches has to manage both projects and
        relationships well.
      </ArticleParagraph>
      <ArticleParagraph>
        Planning Center has some tools for this: workflows and tasks.
        They&apos;re good for what they do (linear people flows and lists of
        tasks), but I think there&apos;s a way to cover more ground.
      </ArticleParagraph>
      <ArticleParagraph>
        First let&apos;s look at how this could work for care.
      </ArticleParagraph>
      <ArticleParagraph>
        Years ago, a friend from Passion City Church told me how he sets
        reminders in his phone for key dates in the lives of the people he
        knows. He&apos;ll set them for death anniversaries, upcoming
        graduations, new jobs, and so much more. I picked this habit up, and
        it&apos;s helped me be a better friend and ministry leader. I care about
        the people in my life, and this is a digital system designed to not let
        me forget what matters to them.
      </ArticleParagraph>
      <ArticleParagraph>
        What if Planning Center had this baked into Tasks? Imagine you could{" "}
        <mark>store key dates in a People profile and then be reminded</mark>{" "}
        annually of those events so someone can reach out to them? What if key
        things could be inferred from prayer requests in order to ensure ongoing
        care without adding a full-time job amount of admin work?
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-dates.png"
        alt="Planning Center Dates Mockup"
        width={1000}
        height={1000}
        className="mt-10"
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-dates-widget.png"
        alt="Planning Center Dates Widget Mockup"
        width={1000}
        height={1000}
        className="my-10"
      />
      <ArticleParagraph>
        Let&apos;s expand this care flow out a bit to <mark>care boards</mark>.
        While workflows are great for linear processes, many care situations
        aren&apos;t that. Tracking congregants who are in a medical care journey
        is a great example. People are constantly moving in and out of the
        hospital and home, and at times, they move into hospice care. While you
        could track this with custom fields, there&apos;s no great way to stay
        on top of this critical care journey.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Solving this doesn&apos;t have to be a whole new module. This can be a
        view of a project.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-care-board.png"
        alt="Planning Center Care Board Mockup"
        width={1000}
        height={1000}
        className="mt-2 mb-10"
      />
      <ArticleParagraph>
        But we&apos;re missing one piece to bring this all together. We need a
        way to <mark>link any Planning Center item to a task</mark>.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//task-description.png"
        alt="Planning Center Task Description Mockup"
        width={1000}
        height={1000}
        className="mt-2 "
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//linked-items.png"
        alt="Planning Center Task Description Mockup"
        width={1000}
        height={1000}
        className="mb-10"
      />

      <ArticleParagraph>
        Currently I can link a Tasks list to a Calendar event, but more often
        than not, a task or a project involves things from multiple PCO apps.
      </ArticleParagraph>
      <ArticleParagraph>
        Kids camp needs Services, Check-Ins, Calendar, Registrations, People,
        and Publishing.
      </ArticleParagraph>
      <ArticleParagraph>
        A pastoral care team meeting needs People (Forms, Lists, Workflows, and
        People).
      </ArticleParagraph>
      <ArticleParagraph>
        A building remodel needs Rooms and Resources from Calendar with some
        awareness of what’s happening in Services.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark>The project is the hub. The apps are the spokes.</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        If you can mention people, form submissions, services, songs, events,
        and more within Tasks, you bring the whole picture into one place so
        anyone can understand the project, see all that&apos;s involved, and
        quickly make changes in the right areas. You can create a task and link
        all the PCO pages that are needed so that when you assign it, a person
        has all they need (this is especially helpful for volunteers).{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        And let&apos;s go one step further. Imagine if you could{" "}
        <mark>submit a form and have that auto-create a task</mark> (i.e., a
        prayer request). Then, rather than leaving it in a queue, you make Home
        aware of your org chart and who is good at what. You can then
        auto-assign these based on who submitted it and what it&apos;s about. A
        general prayer request from a young mom can be auto-assigned to the
        children&apos;s pastor. A prayer request mentioning self harm and be an
        immediate alert to the senior pastor or the pastoral care pastor. Now,
        more of the staff is involved in caring for people and less admin work
        had to be done to get there.
      </ArticleParagraph>
      <SectionHeader>04. WIKI</SectionHeader>
      <ArticleParagraph>Dashboards. Tasks. And Wiki. </ArticleParagraph>
      <ArticleParagraph>
        Knowledge management is hard, especially when you&apos;re trying to keep
        on top of it for staff, volunteers, committees, and congregants.
        Planning Center needs a place for this, and Home is the perfect option.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Wiki&apos;s make it easier to document information, to share training
        materials, and to keep your work all in one place. If PCO brings in
        project management and documents, most church staff members would only
        ever need to work in PCO.
      </ArticleParagraph>
      <ArticleParagraph>
        This isn&apos;t about building a moat. Instead, it&apos;s about getting
        all the information in one place. This is essential for a world moving
        towards AI tools that synthesize large amounts of data.
      </ArticleParagraph>
      <ArticleParagraph>Which brings me to…</ArticleParagraph>
      <SectionHeader>05. NATURAL LANGUAGE DASHBOARDS</SectionHeader>
      <ArticleParagraph>
        There&apos;s so much more that can be done with natural language for a
        church, but dashboards are the perfect place to start.
      </ArticleParagraph>
      <ArticleParagraph>
        People Lists are powerful, but they&apos;re only as powerful as the
        person behind the rules. I quite regularly have to share this graphic in
        the Facebook group and Slack to help people find active members. It
        shouldn&apos;t be this hard.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//list-rules.png"
        alt="Planning Center Natural Language Dashboard"
        width={1000}
        height={1000}
        className="mt-10"
      />
      <ArticleParagraph>
        As someone with a theology degree working in IT, I ran into this a lot
        at Hillsong. Pastoral staff know their needs, but they don&apos;t know
        what technically possible. Tech people know what they want to build and
        what they can&apos;t, but they&apos;re not always the best at
        understanding what&apos;s needed on the ground and why. Neither side
        knew how to talk to each other and I had to be the bridge between the
        two.
      </ArticleParagraph>
      <ArticleParagraph>
        This is what it feels like watching non-technical staff use Lists.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        If you could simply type in, &quot;Who&apos;s been involved in the past
        6 months?&quot; you make it easier for those in ministry to find what
        they need.
      </ArticleParagraph>
      <ArticleParagraph>
        And this doesn&apos;t mean rewriting the whole app. All you have to do
        is write some well-define tools for a natural language agent to use.
        Even starting with just a tool to build lists and a tool to build a
        dashboard gets you going.
      </ArticleParagraph>
      <ArticleParagraph>
        I&apos;m not convinced we need a conversational interface. I doubt this
        is truly the future. But I do think that AI can be the bridge for
        non-technical people to use PCO like never before.
      </ArticleParagraph>
      <SectionHeader>06. CLOSING THOUGHTS</SectionHeader>
      <ArticleParagraph>
        Planning Center is the best tool out there for churches. No one matches
        their features, care, and integrity. I&apos;m thankful for what we have,
        and whether these tools are built by PCO themselves or by a third party
        using their API, I&apos;m hopeful for what could be.
      </ArticleParagraph>
      <ArticleParagraph>
        If you have thoughts on this, let me know at{" "}
        <a
          href="mailto:hey@thomasharmond.com"
          className="underline hover:text-primary "
        >
          hey@thomasharmond.com
        </a>
        .
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
