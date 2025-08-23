import ArticleHeader from "@/components/ArticleHeader";
import ArticleList from "@/components/ArticleList";
import ArticleParagraph from "@/components/ArticleParagraph";
import { OpenGraphPreview } from "@/components/OpenGraphPreview";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes on Craft and Quality",
  description: "The companies that have helped me shape Church Space",
};

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
  {
    title: "Do I really need 14 apps to join the team?",
    description: "Who’s going to build Notion for Churches?",
    link: "/ideas/14-apps",
  },
  {
    title: "My Stack",
    description: "What I used to build Church Space",
    link: "/ideas/my-stack",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <ArticleHeader
        title="Notes on Craft and Quality"
        description="The companies that have helped me shape Church Space"
      />
      <SectionHeader>01. INTRODUCTION</SectionHeader>
      <ArticleParagraph>
        Like most designers, I couldn&apos;t get enough of the Jony Ive Stripe
        Session interview from a few weeks ago. The whole thing was a
        masterclass in design philosophy.
      </ArticleParagraph>
      <ArticleList type="unordered">
        <li>
          <span>
            Progress requires conviction and vision; it&apos;s not inevitable
          </span>
        </li>
        <li>
          <span>Simplicity and joy are essential to design</span>
        </li>
        <li>
          <span>
            Good design has to actually work, otherwise it&apos;s ugly
          </span>
        </li>
      </ArticleList>
      <ArticleParagraph>
        All great stuff. But one line stood out to me more than the others:
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-bold">
          “What we make stands testament to who we are.”
        </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        I can&apos;t stop thinking about this.
      </ArticleParagraph>
      <ArticleParagraph>
        It&apos;s one of those insanely simple ideas with an incredible
        depth.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        What we make—music, paintings, software, products—speaks to who we are,
        what we value.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        If we make software but it&apos;s ugly and unintuitive, it says that
        craft doesn&apos;t matter. It says we care about function and
        productivity but we don&apos;t care about our product bringing the
        person joy. It says we don&apos;t mind if they have to read some support
        docs and send us a support email. Plainly, it says we don&apos;t
        care.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        However, when we sweat the details with small animations, intuitive UIs,
        thoughtful DX, progressive disclosure, tasteful use of color, and
        approachable layouts, we show that we care, most of all, about them. We
        make the software in a way that doesn&apos;t make people feel
        incompetent, but empowered. We make the software in a way that brings
        delight. We make software that looks beautiful and works well.
      </ArticleParagraph>
      <ArticleParagraph>
        This, of course, lines up with what we believe as Christians. God
        created the vast and beautiful universe. He crafted every detail. He
        designed creation to work and make sense. And then he empowered us to
        steward his creation. To cultivate the earth. To do to it what he did to
        the universe. And we do this with our craft, our creativity, and our
        thoughtfulness.
      </ArticleParagraph>
      <ArticleParagraph>
        It is theological for us to make something beautiful. We do it because
        we&apos;re commissioned to. We do it because the output leads to
        goodness. We do it because we care about the people on the other side.
        We also do it because in the act of making, we learn something about
        God. We learn something about creation. We learn something about
        ourselves.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        There&apos;s another reason why craft matters, though. With the advent
        of the vibe coders, any feature is now just a prompt away. Features that
        used to be your moat no longer are. We&apos;ll see a cheaper copy-cat of
        every app out there over the next few years.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        With that moat gone, the only two left are existing marketshare and
        craft. I don&apos;t have much to say on the former, I only just launched
        a product after all. But the latter? Well, that&apos;s something that
        every builder and maker has control over. You can choose to sweat the
        details. You can choose to pay attention to the small things. You can
        choose to be empathetic in how you design features and interfaces.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Craft and quality matter because it reflects who we are, it serves
        people well, and it honors God, but it&apos;s also just good business.
        (Funny how God&apos;s way tends to work out well practically… you&apos;d
        think it&apos;s designed that way.){" "}
      </ArticleParagraph>
      <ArticleParagraph>
        As I&apos;ve built and continue to build{" "}
        <span className="inline">
          <Link
            href="https://churchspace.co"
            className="group inline items-baseline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded bg-[#6065fe]">
              <svg
                height={14}
                width={14}
                viewBox="0 0 185 291"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none">
                  <path
                    d="M142.177 23.3423H173.437C179.612 23.3423 184.617 28.3479 184.617 34.5227V258.318C184.617 264.493 179.612 269.498 173.437 269.498H142.177V23.3423Z"
                    fill="white"
                  />
                  <path
                    d="M0 57.5604C0 52.8443 2.9699 48.6392 7.41455 47.0622L125.19 5.27404C132.441 2.70142 140.054 8.07871 140.054 15.7722V275.171C140.054 282.801 132.557 288.172 125.332 285.718L7.55682 245.715C3.03886 244.18 0 239.939 0 235.167V57.5604Z"
                    fill="white"
                  />
                </g>
              </svg>
            </span>
            <span className="underline decoration-2 underline-offset-2 transition-all duration-300 ease-in-out group-hover:underline-offset-4">
              Church Space
            </span>
          </Link>
        </span>
        , there have been many companies who embody these values and have
        inspired me to build beautiful software. Here are a few:
      </ArticleParagraph>

      <SectionHeader url="https://linear.app">Linear</SectionHeader>
      <ArticleParagraph>
        Linear is the definition of a company who cares. A lot can be learned
        from just clicking around their app.{" "}
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://linear.app/blog/rethinking-the-startup-mvp-building-a-competitive-product"
        variant="compact"
      />
      <OpenGraphPreview url="https://linear.app/method" variant="compact" />
      <OpenGraphPreview url="https://linear.app/blog" variant="compact" />
      <OpenGraphPreview
        url="https://linear.app/blog/scaling-the-linear-sync-engine"
        variant="compact"
      />
      <OpenGraphPreview url="https://x.com/artman" variant="compact" />
      <OpenGraphPreview url="https://x.com/karrisaarinen" variant="compact" />
      <OpenGraphPreview
        url="https://youtu.be/pCil7YNhNCU?si=Q7mZLWP0pgBSj0SH"
        title="Config 2025: Crafting quality that endures (Karri Saarinen, Co-founder & CEO, Linear) | Figma"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://youtu.be/NQmw8eqfd9o?si=wbyHBsxVvjM7kbEB"
        title="Julian Lehr - How to get people excited about your product"
        variant="compact"
      />
      <SectionHeader url="https://midday.ai">Midday</SectionHeader>
      <ArticleParagraph>
        The founds of Midday, Pontus Abrahamsson and Viktor Hofte, are
        incredibly helpful with what they share on Twitter. They&apos;ve shaped
        a lot of the design and tech stack of Church Space.{" "}
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://github.com/midday-ai/midday"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://github.com/midday-ai/v1"
        variant="compact"
      />
      <OpenGraphPreview url="https://x.com/pontusab" variant="compact" />
      <OpenGraphPreview url="https://x.com/viktorhofte" variant="compact" />
      <SectionHeader url="https://raycast.com">Raycast</SectionHeader>
      <ArticleParagraph>
        I cannot imagine using a Mac without Raycast. From window management,
        clipboard history, and snippets to the Linear, Svgl, and Shell
        extensions, I&apos;m constantly opening Raycast and using key commands
        set in it throughout my day.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        It&apos;s fun following their socials too. Their core product
        doesn&apos;t really have that much flashy UI that can be shared, but
        they still put out stunning work. And Pedro will one day be a case study
        in how to build a community around a product.
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://youtu.be/Kgn-e5a5uZA?si=vhEySLIQ8GM52ACa"
        title="The Ultimate Raycast Deep Dive (craft, AI, hype, & more)"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://www.youtube.com/@raycastapp"
        variant="compact"
      />
      <OpenGraphPreview url="https://x.com/thomaspaulmann" variant="compact" />
      <OpenGraphPreview url="https://x.com/peduarte" variant="compact" />
      <OpenGraphPreview url="https://x.com/aantonov_" variant="compact" />
      <OpenGraphPreview url="https://x.com/RvRoo" variant="compact" />
      <OpenGraphPreview url="https://ray.so/#padding=64" variant="compact" />
      <SectionHeader url="https://thebrowser.company/">
        The Browser Company
      </SectionHeader>
      <ArticleParagraph>
        The Browser Company knows how to build beautiful products that bring
        delight. While it&apos;s been a rough ending, Arc rethought what a
        browser was and could be. It made me and thousands of others care deeply
        about something they never thought about before. And Dia has been an
        excellent experience so far. It feels fast and polished (even though
        it&apos;s in beta). I&apos;ve also learned a lot about novelty fatigue
        from what they&apos;ve shared.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Arc Search is another great example of thinking through a product from
        first principles. They didn&apos;t try to recreate a desktop browser on
        mobile. Instead, they stepped back and thought through the primary way a
        user uses a mobile browser: search. So building the app to make
        searching as easy and fast as possible was the perfect move.{" "}
      </ArticleParagraph>
      <OpenGraphPreview url="https://www.diabrowser.com/" variant="compact" />
      <OpenGraphPreview url="https://arc.net/" variant="compact" />
      <OpenGraphPreview
        url="https://thebrowser.company/values/"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://open.spotify.com/show/512srmQyB2LQTLVQzIsFV3?si=3f3835d1e67e4be6"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://www.youtube.com/@TheBrowserCompany"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://youtu.be/sbQCYmnNHVY?si=bnrVXcfEPeeh_94T"
        title="Dustin Senos - Designing Dia (the AI-native web browser)"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://youtu.be/w45EQ2jS5ok?si=nmvBKKUi8Wgx5jdA"
        title="Config London 2025: Designing for both iOS and Android—the right way with Christine Røde"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://www.nytimes.com/2025/07/11/technology/personaltech/ai-internet-browser-dia.html"
        title="Is A.I. the Future of Web Browsing?"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://www.youtube.com/watch?v=210zavw00y4"
        title="Arc Had Millions of Users. Why They Left It Behind for Dia."
        variant="compact"
      />
      <OpenGraphPreview url="https://x.com/joshm" variant="compact" />
      <SectionHeader url="https://www.campsite.com/">Campsite</SectionHeader>
      <ArticleParagraph>
        The founders were acquired by Notion, and the product has been sunset.
        Nevertheless, Campsite was a great example of a well crafted all-in-one
        app. I&apos;m a big fan of this graphic they had on their landing page
        at one point.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//campsite.png"
        alt="Campsite"
        width={1500}
        height={1500}
        className="px-2"
      />

      <OpenGraphPreview url="https://x.com/brian_lovin" variant="compact" />
      <SectionHeader url="https://www.notion.com/">Notion</SectionHeader>
      <ArticleParagraph>
        Notion is a complex product and yet it&apos;s so easy to use.
        They&apos;ve mastered progressive disclosure.
      </ArticleParagraph>
      <ArticleParagraph>
        They&apos;re also becoming more and more of an all-in-one app: notes,
        forms, databases, email, calendar, scheduling, and with the acquisition
        of the Campsite founders, I would guess Slack-like messaging isn&apos;t
        far away.{" "}
      </ArticleParagraph>
      <SectionHeader url="https://www.fey.com/">Fey</SectionHeader>
      <ArticleParagraph>
        Fey is another company with great founders and beautiful design.{" "}
      </ArticleParagraph>
      <OpenGraphPreview url="https://x.com/brotzky_" variant="compact" />
      <OpenGraphPreview url="https://x.com/tcosta_co" variant="compact" />
      <OpenGraphPreview url="https://x.com/tjruss_" variant="compact" />
      <SectionHeader url="https://cal.com/">Cal.com</SectionHeader>
      <ArticleParagraph>Another good one.</ArticleParagraph>
      <OpenGraphPreview
        url="https://github.com/calcom/cal.com"
        variant="compact"
      />
      <SectionHeader url="https://posthog.com/">Posthog</SectionHeader>
      <ArticleParagraph>
        I love their unique design. I also quite often think about an email they
        sent announcing that they&apos;re lowering pricing. Not often you get
        that email from a company. Won a lot of goodwill from me.{" "}
      </ArticleParagraph>
      <SectionHeader url="https://tana.inc/">Tana</SectionHeader>
      <ArticleParagraph>
        Before Tana had a proper mobile app, they had Tana Capture. It let you
        input things to your Tana account on the go through voice, text, images,
        and files. It was a simple app, but it was a great example of thinking
        through what you can do now and what people actually need before you get
        to the point of building out the full vision of what you want.{" "}
      </ArticleParagraph>
      <SectionHeader>CONCLUSION</SectionHeader>
      <ArticleParagraph>
        If you have any other companies you think of as great examples of craft
        and quality, send them to me at{" "}
        <a
          className="hover:text-primary underline"
          href="mailto:hey@thomasharmond.com"
        >
          hey@thomasharmond.com
        </a>
        .
      </ArticleParagraph>
      <div className="text-muted-foreground mt-4 border-t px-2 pt-6 text-sm font-semibold">
        July 14, 2025
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
