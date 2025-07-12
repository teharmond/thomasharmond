import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import ArticleList from "../../../../components/ArticleList";

export default function page() {
  return (
    <div className="px-2 gap-4 flex flex-col">
      <ArticleHeader
        title="My Stack"
        description="What I used to build Church Space"
      />
      <ArticleParagraph>
        I recently launched Church Space. Here&apos;s where I landed for my
        stack.
      </ArticleParagraph>
      <SectionHeader>01. FRAMEWORK</SectionHeader>
      <ArticleParagraph>
        <mark className="font-semibold">
          Next.js and React with TypeScript.
        </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Everyone has their (very strong) opinions on this, but Next is the best
        way to ship an app in 2025. AI coding tools know it well which helps a
        solo-dev (like myself) fix bugs and move fast. I use the app router with
        server actions for most interactions with with my database.
      </ArticleParagraph>
      <ArticleParagraph>
        I use a Turborepo to allow me to reuse code across apps. There are 5
        apps right now:
      </ArticleParagraph>
      <ArticleList type="ordered">
        <li>
          <span className="font-semibold">Church Space</span>
        </li>
        <li>
          <span className="font-semibold">Church User Content</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                I use this to proxy content in email as Supabase puts a
                Cloudflare set cookie header on all content which leads to some
                email clients not loading images.{" "}
              </span>
            </li>
            <li>
              <span>
                I also use this to add on the play button for YouTube video
                thumbnails.
              </span>
            </li>
            <li>
              <span>
                The images and content are cached here so that each email open
                is not hitting my storage.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Church Space Email</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                This is where people can manage their email preferences and view
                emails in the browser.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Custom Domains</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                This is used for link pages with custom domains as well as for
                forms.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Docs/Help Center</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>Built with Mintlify.</span>
            </li>
          </ArticleList>
        </li>
      </ArticleList>
      <ArticleParagraph>
        Eventually, we&apos;ll add mobile to this list. I plan to use React
        Native and Expo when that time comes.
      </ArticleParagraph>
      <SectionHeader className="mt-10">02. STYLING</SectionHeader>
      <ArticleParagraph>
        <mark className="font-semibold">Tailwind CSS and shadcn/ui</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Similar to Next, Tailwind and shadcn/ui help me move fast while still
        giving me loads of flexibility. Colocating my styles allows me to make
        all changes to a component on a single file. The CSS bundle stays small
        due to the way that Tailwind complies down to just the classes used.
      </ArticleParagraph>
      <ArticleParagraph>
        Shadcn provides the perfect starting point. Why would I build a button
        from scratch when I can start with a base of something that&apos;s
        already functional, accessible, and well designed?
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Nucleo Icons</mark>
      </ArticleParagraph>

      <ArticleParagraph>
        For icons, I&apos;m a huge fan of Nucleo. It&apos;s a one time purchase,
        new icons and styles are constantly added, the icons are beautiful, and
        I&apos;ve had icon requests be added quickly. I feel like I&apos;m
        stealing with how affordable it is. Plus they elevate your app above the
        standard Lucide icons.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Motion</mark> (previously Framer Motion)
      </ArticleParagraph>
      <ArticleParagraph>
        Using Motion helps bring small things to life in the app.
        Micro-animations (along with taste and design) help set apps apart in
        2025 when a feature can be prompted in 10 minutes.
      </ArticleParagraph>
      <SectionHeader className="mt-10">03. DATABASE</SectionHeader>
      <ArticleParagraph>
        <mark className="font-semibold">Postgres</mark> (Supabase)
      </ArticleParagraph>
      <ArticleParagraph>
        Postgres just makes sense to me. It&apos;s how I thought about data
        before I knew anything about database.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Supabase is easy to work with and affordable. Could I self-host? Sure.
        But that&apos;s not what I want to spend my time and energy on at this
        stage.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I also use Supabase for auth and storage. Again, this is a choice that
        helps me move fast while also keeping things as simple as possible for
        me to maintain.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Upstash</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        At the moment, I only use Redis for rate limiting, but there are loads
        of things that could be improved in Church Space by using it more.
      </ArticleParagraph>
      <SectionHeader className="mt-10">04. AI</SectionHeader>
      <ArticleParagraph>
        <mark className="font-semibold">Vercel AI SDK with Google Gemini</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        The AI SDK is a dream to work with. You&apos;re able to quickly test out
        differnt modles with a single line of code, it&apos;s easy to add tools,
        and like most things in my stack, it lets me move fast.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Google has been my go to model provider. It&apos;s incredibly cheap and
        the models are plenty good for what I&apos;m doing. Even with doing OCR
        on paper forms submissions, my AI bill is cheap.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Cursor and Claude Code</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        For dev tools, I&apos;ve been using Cursor and Claude Code.
        Cursor&apos;s tab complete is unmatched, and Claude Code&apos;s limits
        allow me to have a background task or two going at any time while I work
        on the details and on files that need human intervention.{" "}
      </ArticleParagraph>
      <SectionHeader className="mt-10">05. EVERYTHING ELSE</SectionHeader>
      <ArticleParagraph>
        <mark className="font-bold">Vercel </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Vercel&apos;s DX is unmatched. Again, I could self host my app, but why
        on earth would I do that as a solo dev when I can pay $20/mo to not
        think about it? Additionally, they keep improving the product and keep
        cutting costs with things like Fluid Compute and Active CPU.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I also use Vercel for analytics. I&apos;ll eventually move to Posthog,
        but I&apos;m not hitting free limits on Vercel any time soon.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Trigger.dev</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        I use Trigger.dev for my background jobs. While node has it&apos;s
        drawbacks at scale, I love writing everything in TS and being able to
        reuse functions from other parts of the app.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Resend</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Resend is what I use for email delivery. The DX is super easy. I use
        their webhooks for things like opens, click tracking, and domain
        verification.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Zustand, React Query, and Nuqs</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        I use Zustand for global state in the app (mainly just things to do with
        the user, their organization, and their PCO connection).
      </ArticleParagraph>
      <ArticleParagraph>
        I use React Query for all server state management.
      </ArticleParagraph>
      <ArticleParagraph>
        I use Nuqs for url state management, and it&apos;s such a breeze to work
        with.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">DND Kit</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        My drag and drop tool of choice. Used throughout the app. Has some
        quirks, but good overall.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">Tiptap </mark>
      </ArticleParagraph>
      <ArticleParagraph>
        The extensions (both included and custom) make Tiptap a great option for
        a rich text editor. I like that I can get the json and the and HTML of
        the editor contents. If/when I eventually work on mobile, having some
        flexibility with the data format will be helpful.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">React QR Code Logo</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        A great tool for making custom QR codes.{" "}
      </ArticleParagraph>
      <SectionHeader className="mt-10">06. CLOSING THOUGHTS</SectionHeader>

      <ArticleParagraph>
        In the past 2 months since having actaully put something out in the
        world, I&apos;ve been able to connect with so many people: builders,
        churches, and companies. I built for a year in private, just slowly
        working on what I wanted to do. Building in public is 1,000x more
        rewarding and motivating. Stop worrying about your stack. Go build
        something.
      </ArticleParagraph>
    </div>
  );
}
