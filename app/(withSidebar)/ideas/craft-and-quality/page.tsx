import ArticleHeader from "@/components/ArticleHeader";
import ArticleList from "@/components/ArticleList";
import ArticleParagraph from "@/components/ArticleParagraph";
import { OpenGraphPreview } from "@/components/OpenGraphPreview";
import SectionHeader from "@/components/SectionHeader";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className=" gap-4 flex flex-col">
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
        It&apos;s one of those insanely simple ideas with an incredible depth.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        What we make—music, paintings, software, products—speaks to who we are,
        what we value.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        If we make software but it’s ugly and unintuitive, it says that craft
        doesn’t matter. It says we care about function and productivity but we
        don’t care about our product bringing the person joy. It says we don’t
        mind if they have to read some support docs and send us a support email.
        Plainly, it says we don’t care.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        However, when we sweat the details with small animations, intuitive UIs,
        thoughtful DX, progressive disclosure, tasteful use of color, and
        approachable layouts, we show that we care, most of all, about them. We
        make the software in a way that doesn’t make people feel incompetent,
        but empowered. We make the software in a way that brings delight. We
        make software that looks beautiful and works well.
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
        we’re commissioned to. We do it because the output leads to goodness. We
        do it because we care about the people on the other side. We also do it
        because in the act of making, we learn something about God. We learn
        something about creation. We learn something about ourselves.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        There’s another reason why craft matters, though. With the advent of the
        vibe coders, any feature is now just a prompt away. Features that used
        to be your moat no longer are. We’ll see a cheaper copy-cat of every app
        out there over the next few years.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        With that moat gone, the only two left are existing marketshare and
        craft. I don’t have much to say on the former, I only just launched a
        product after all. But the latter? Well, that’s something that every
        builder and maker has control over. You can choose to sweat the details.
        You can choose to pay attention to the small things. You can choose to
        be empathetic in how you design features and interfaces.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Craft and quality matter because it reflects who we are, it serves
        people well, and it honors God, but it’s also just good business. (Funny
        how God’s way tends to work out well practically… you’d think it’s
        designed that way.){" "}
      </ArticleParagraph>
      <ArticleParagraph>
        As I’ve built and continue to build{" "}
        <span className="inline">
          <Link
            href="https://churchspace.co"
            className="inline items-baseline group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="h-5 w-5 bg-[#6065fe] mr-1.5 rounded items-center justify-center inline-flex">
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
            <span className="underline decoration-2 underline-offset-2 group-hover:underline-offset-4 transition-all duration-300 ease-in-out">
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
      <OpenGraphPreview
        url="https://x.com/artman"
        variant="compact"
        title="Thomas Artman"
      />
      <OpenGraphPreview
        url="https://x.com/karrisaarinen"
        variant="compact"
        title="Karri Saarinen"
      />
      <OpenGraphPreview
        url="https://youtu.be/pCil7YNhNCU?si=Q7mZLWP0pgBSj0SH"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://youtu.be/NQmw8eqfd9o?si=wbyHBsxVvjM7kbEB"
        variant="compact"
      />
      <SectionHeader>Midday</SectionHeader>
      <ArticleParagraph>
        The founds of Midday, Pontus Abrahamsson and Viktor Hofte, are
        incredibly helpful with what they shared in Twitter. They’ve shaped a
        lot of the design and tech stack of Church Space.{" "}
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://github.com/midday-ai/midday"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
      <SectionHeader>Linear</SectionHeader>
      <ArticleParagraph></ArticleParagraph>
      <OpenGraphPreview
        url="https://x.com/thomaspaulmann"
        title="Thomas Paul Mann"
        variant="compact"
      />
    </div>
  );
}
