import ArticleHeader from "@/components/ArticleHeader";
import ArticleParagraph from "@/components/ArticleParagraph";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/SectionHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crafting Delight",
  description: "On creating software magic.",
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
        title="Crafting Delight"
        description="On creating software magic."
      />
      <ArticleParagraph>
        I recently heard Tobi Lütke, the CEO and co-founder of Shopify, say that{" "}
        <Link
          href="https://www.youtube.com/watch?v=bRQT_oN51Fw"
          target="_blank"
          className="hover:text-primary underline"
        >
          &quot;experience minus expectations, if that&apos;s a positive number,
          that is the amount of delight caused.&quot;
        </Link>
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/tobi-delight.png"
        alt="Delight Formula"
        width={1920}
        height={1920}
        className="mt-2"
      />
      <ArticleParagraph>
        We all desire for the people using our apps to be delighted. We want
        them to have &apos;wow&apos; moments. Moments where using our software
        puts a smile on their face. Moments where they realize their job just
        got a little easier. Moments of magic.
      </ArticleParagraph>
      <ArticleParagraph>
        Often, we think the path to this is features, and we&apos;re not wrong
        to think this. I remember the first time I used Roam Research—the app to
        popularize back-linking in note taking. From the first backlink, I
        realized that I finally found a note taking app that works how I&apos;ve
        always wanted. I started bringing together ideas from every book I read
        by topic, by author, by cross reference of other books I&apos;ve read.
        I&apos;m not sure how I would&apos;ve written papers in college without
        Roam. The feature of back-linking brought delight.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        And yet I do know how I&apos;d do college without Roam as I switched to
        Tana halfway through. They copied the same features, added a bit more,
        and improved on how the app looked and felt. So I switched. But even
        then, since I&apos;ve graduated I&apos;ve found myself leaving these
        back-linking apps all together. Every sermon, blog, or business idea
        I&apos;ve written since I&apos;ve graduated has been in the simpler,
        cleaner Notion. Why? It&apos;s simple:{" "}
        <mark>features are not a moat.</mark> Features matter, but they&apos;re
        the easiest thing to copy and to come up with.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        The key to delight it not features, it&apos;s craft. It&apos;s design
        that keeps people in a state of flow. In fact, I&apos;m most delighted
        by the apps that get out of the way, make me forget I&apos;m using an
        app at all, and let me get my work done.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        But workplace apps are hard. Most people didn&apos;t sign up for their
        role with the expectation that 90% of it would take place on a screen.
        So building tools people use at work—from issue trackers to church
        management softwares—is an uphill battle. People come in with loads of
        suspicion (or at least incredibly high expectations), so if your app
        isn&apos;t well designed in both function and form, people will loath
        it. The app will create more work, not less. And the work it creates
        won&apos;t be fulfilling work, it&apos;ll just be{" "}
        <Link
          href="https://www.amazon.com/Bullshit-Jobs-Theory-David-Graeber/dp/150114331X"
          target="_blank"
          className="hover:text-primary underline"
        >
          pointless waste.
        </Link>{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        So how do we make workplace apps that are loved like Linear rather than
        loathed like Jira?{" "}
      </ArticleParagraph>
      <SectionHeader>01. Follow Common UI/UX Patterns</SectionHeader>
      <ArticleParagraph>
        Every app—from Facebook to Figma, from Spotify to Stripe—uses the same
        UI/UX pattern for navigation: a sidebar. Is this because a sidebar is
        always the best UX to get around? It is because it looks the nicest?
        I&apos;m not sure. But what I do know is that most users know how to use
        it which often makes it the right choice for the job. If you want to
        maximize delight, keep the important things familiar.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/sidebars.png"
        alt="Sidebar Navigation"
        width={1920}
        height={1920}
        className="mt-2"
      />
      <ArticleParagraph>
        While a designer might be proud of coming up with something different
        and unique, users just feel a higher level of friction and cognitive
        load.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        A few years ago, I was driving a rental car to pick someone up from the
        airport. Once we got the car loaded, I shifted into reverse, put my foot
        on the gas, and to my horror started going forward nearly hitting the
        parked car in front of me. Did this happen because I’m a klutz? No, it
        happened because some designer thought that that it would be a wonderful
        idea to put the reverse icon under the park icon but to get in reverse
        from park I have to move the gear shifter up. It’s not just me; there’s
        nearly 100k views on a{" "}
        <Link
          href="https://www.youtube.com/watch?v=DJWxcHIdPg0"
          target="_blank"
          className="hover:text-primary underline"
        >
          video showing you how to use the gear shifter in this one car.
        </Link>{" "}
        Mitsubishi (and every other modern car maker these days) reinvented
        something worked fine, and now you have to relearn how to drive in every
        car you get in.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/gear-shifter.png"
        alt="Gear Shifter"
        width={1920}
        height={1920}
        className="mt-2"
      />
      <ArticleParagraph>
        That said, not every app in the screenshot above is widely considered
        delightful. Linear, Notion, Stripe, and Open AI are brands that are
        constantly praised for their design. Meanwhile Spotify is regularly
        mocked in design communities for its bloat, Facebook has four navigation
        paradigms on its main page, and Mailchimp makes it hard to get to basic
        settings.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark>
          Following common patterns does not guarantee delight, but not
          following it will always increase the frustration in experience.
        </mark>
      </ArticleParagraph>
      <SectionHeader>02. FOCUS ON THE INVISIBLE</SectionHeader>
      <ArticleParagraph>
        Linear is the master of the invisible. From a screenshot, it
        doesn&apos;t look far from every other app out there: there&apos;s a
        sidebar, a table, and some breadcrumbs. But then you use it. Immediately
        you&apos;re blown away by the speed. Everything loads instantly, you can
        navigate solely with your keyboard, and you can edit anything inline (no
        clunky modals or edit states). On top of that, nothing in the UI
        re-renders when you navigate, you never accidentally un-select items,
        and every option you need shows up in the UI right when you need it but
        doesn&apos;t clutter it up before.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Everything just feels thoughtful, and yet it&apos;s almost entirely
        unseen. Rather, <mark>it&apos;s felt.</mark>{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        At the end of your first day in Linear, you can&apos;t quite say why,
        but you have this feeling of delight. You didn&apos;t hit any pain
        points, nothing worked counter to how you expected, and everything just
        made sense. Put simply, it just works.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Vercel design engineer Rauno Freiberg recently released a course called
        <Link
          href="https://devouringdetails.com"
          target="_blank"
          className="hover:text-primary underline"
        >
          Devouring Details
        </Link>
        . My biggest takeaway from it is the idea of &quot;inferring
        intent.&quot; It&apos;s where you know what the user is trying to do and
        making that easier without them even asking. It&apos;s what makes
        software feel like magic. You see this in Vercel when you add
        environment variables. Instead of having to paste the name and then
        paste the value and then repeat for each variable, you can just paste
        your full .env file into the first input and it&apos;s automatically
        parsed.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        One of Linear&apos;s best examples of this is{" "}
        <Link
          href="https://linear.app/now/invisible-details"
          target="_blank"
          className="hover:text-primary underline"
        >
          how sub-menus work
        </Link>{" "}
        in their contextual menus. When they realized that the sub-menu would
        close as a user tried to move their mouse to it, they started tracking
        your mouse to produce a safe area making sure you didn&apos;t have to
        perfectly position your mouse just to update a label.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/linear-sub-menu.png"
        alt="Linear Sub-Menu"
        width={1920}
        height={1920}
        className="mt-2 rounded-md"
      />
      <ArticleParagraph>
        When you infer intent, when you focus on the little details, you create
        software magic. You show people that you care. And while they may never
        notice, they will <i>feel</i> it.{" "}
      </ArticleParagraph>
      <SectionHeader>03. CARE ABOUT HOW IT LOOKS</SectionHeader>
      <ArticleParagraph>
        Obviously the way an application looks matters. Half the reason I
        switched from Tana to Notion was a desire for the the cleanest possible
        interface. I wanted something that focused on beauty and used
        progressive disclosure for anything that typically clutters lesser
        interfaces.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/colors.png"
        alt="Notion Colors"
        width={1920}
        height={1920}
        className="mt-2 rounded-md"
      />
      <ArticleParagraph>
        Even the colors you use completely change the feel of the app. The right
        sans serif can set you apart. Choosing to fade away elements while a
        person is typing and the mouse is not moving creates focus. Making sure
        text is readable in both light and dark mode matters. Aligned icons{" "}
        <i>feel</i>
        right even if no one ever notices.{" "}
      </ArticleParagraph>
      <ArticleParagraph>Every visual detail matter. </ArticleParagraph>
      <SectionHeader>
        04. KNOW WHO YOU&apos;RE BUILDING FOR (AND WHAT YOU'RE BUILDING)
      </SectionHeader>
      <ArticleParagraph>
        Notion doesn&apos;t have common text editor features immediately
        visible. As I type this, I don&apos;t see an option to underline,
        highlight, or strikethrough my text. I can&apos;t change the font size,
        the font style, or the font weight. And yet, in Figma, every possible
        option is in my face. Why? Despite both apps being able to format text,
        the former is made for capturing and working on ideas while the latter
        is made for design. In Figma, how the text looks is the whole point, so
        having the formatting features readily available is the expectation
        while in Notion it would be clutter.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        In the same way, Facebook—a social app—makes it easy to get to my
        profile whereas Linear—an issue tracker—make my avatar a tiny icon in
        the corner.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        What you&apos;re building determines if something is clutter or
        required.{" "}
      </ArticleParagraph>
      <SectionHeader>
        05. GIVE USERS THE CHOICE (BUT HAVE OPINIONS)
      </SectionHeader>
      <ArticleParagraph>
        Many companies don&apos;t provide their users with &quot;advanced&quot;
        settings because they believe most people won&apos;t use them, and yet
        everyone I know has tweaked the size of their lock screen clock in iOS
        26. Everyone wants to customize and tweak software, especially the
        software that we&apos;re stuck in all day.
      </ArticleParagraph>
      <ArticleParagraph>
        When we write off these features as being &quot;advanced,&quot; we say
        less about the users and more about ourselves. Often what makes a
        setting feel too complicated for an average user is designers not being
        thoughtful enough in where they place the option and how they explain
        it.{" "}
      </ArticleParagraph>
      <div className="overflow-hidden rounded-md border shadow-sm">
        <video
          src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/haptic-touch.mov"
          controls
          playsInline
          className="aspect-video w-full bg-black"
        />
      </div>
      <div className="bg-muted text-muted-foreground w-full rounded-md p-2 px-3 text-xs">
        When you change Haptic Touch settings in iOS, you get a preview of how
        it will work. What would be a confusing setting to most becomes simple.
      </div>
      <ArticleParagraph>
        That said, there&apos;s something to balance here. You want to give
        users the option to make your app their own. Make room for the Ikea
        effect. But this is not an excuse for laziness. Good, strong opinions
        from designers still win over a million options. The art is in knowing
        which choices you give users and which ones need to be made at a product
        level.{" "}
      </ArticleParagraph>
      <SectionHeader>05. AND YEAH, BUILD SOME GREAT FEATURES</SectionHeader>
      <ArticleParagraph>
        Of course features matter and bring delight, but even then, the best
        ones, the ones that feel like magic, don&apos;t draw attention to
        themselves. Notion&apos;s AI search has changed how I do note taking. I
        no longer have to tag and organize everything. I simply ask. And when I
        do, I&apos;m never thinking about how great of a chat interface it is,
        I&apos;m just glad that I could find what I was looking for while
        staying in flow.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark>
          Features matter, but it&apos;s the experience of the features that
          matter more.{" "}
        </mark>
      </ArticleParagraph>
      <SectionHeader>CONCLUSION</SectionHeader>
      <ArticleParagraph>
        An average user can&apos;t articulate any of this, but they feel it all
        implicitly. They don&apos;t know why Facebook feels bloated it, they
        just know it does. They don&apos;t know why Notion feels polished, but
        that&apos;s how they&apos;ll describe it to everyone.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        People feel the smallest decisions we make in our software. Every
        detail—visible and invisible—matters. It shows that the software was
        made by people who care about their users and care about the work they
        do. It shows it was made by people who want to make something wonderful,
        often just for the sake of putting something great out into the
        world.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        So make software that makes people feel like you read their mind. Make
        software that makes people smile. Pay attention to the beauty of how
        something looks, feels, and works.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark>
          Ultimately, make software that makes people forget they&apos;re even
          using it, leaving them only with delight.
        </mark>
      </ArticleParagraph>
      <div className="text-muted-foreground mt-4 border-t px-2 pt-6 text-sm font-semibold">
        November 24, 2025
      </div>
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
