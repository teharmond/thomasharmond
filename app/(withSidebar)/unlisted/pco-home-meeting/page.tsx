import React from "react";
import ArticleHeader from "../../../../components/ArticleHeader";
import SectionHeader from "../../../../components/SectionHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import ArticleList from "../../../../components/ArticleList";
import { Metadata } from "next";
import { OpenGraphPreview } from "@/components/OpenGraphPreview";
import Image from "next/image";

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
    title: "Notes on Craft and Quality",
    description: "The companies that have helped me shape Church Space",
    link: "/ideas/craft-and-quality",
  },
];

export const metadata: Metadata = {
  title: "PCO Home | July 22, 2025",
  description: "Thoughts on PCO Home (and ChMS in general)",
};

export default function page() {
  return (
    <div className=" gap-4 flex flex-col">
      <ArticleHeader
        title="PCO Home | July 22, 2025"
        description="Thoughts on PCO Home (and ChMS in general)"
      />
      <SectionHeader>Links</SectionHeader>
      <OpenGraphPreview
        url="https://mobbin.com/?referrer_workspace_id=882a1dd3-df71-47ed-8a7d-37e2988c8fa3"
        variant="compact"
      />
      <OpenGraphPreview
        url="https://linear.app/blog/building-what-customers-need"
        variant="compact"
      />
      <ArticleParagraph>
        <mark className="w-fit">
          <span className="font-semibold">DEMO</span> (Please don&apos;t use up
          all my AI credits 🙏)
        </mark>
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://pcohome.thomasharmond.com"
        variant="compact"
      />
      <ArticleParagraph>
        <mark className="w-fit">
          <span className="font-semibold">Previous Article</span>
        </mark>
      </ArticleParagraph>
      <OpenGraphPreview
        url="https://thomasharmond.com/idas/pco-home"
        title="On Planning Center Home"
        variant="compact"
      />
      <SectionHeader>Random things I love about PCO</SectionHeader>
      <ArticleList type="unordered">
        <li>
          <span className="font-semibold">Not VC backed.</span>
        </li>
        <li>
          <span className="font-semibold">
            People, Chat, Church Center, Home, etc. is free.
          </span>{" "}
          Surely this is related to the former point.
        </li>
        <li>
          <span className="font-semibold">
            Introduces non-technical/non-process-oriented people to better
            technical processes.
          </span>{" "}
          Workflows are a good example of this. Rather than disorganized email
          threads, phone calls that we assume people are following up, and
          checking in with the team every day, there&apos;s a centralized place
          for this. And simply <i>having</i> the feature makes people ask how
          they could use it, thus leading to better processes. Calendar and the
          approvals built in are another good example of this. The church
          I&apos;m at now would have never had a process for event approvals
          before.
        </li>
        <li>
          <span className="font-semibold">Activity tab in People.</span>
        </li>
        <li>
          <span className="font-semibold">Lists.</span> They&apos;re a
          superpower if you know how to wield them. Every time I think something
          isn&apos;t possible with a Home dashboard or with a data operation, I
          realize that Lists actually enable it.
        </li>
        <li>
          <span className="font-semibold">Potential duplicates.</span>
        </li>
        <li>
          <span className="font-semibold">
            Easy to export data from any app.
          </span>{" "}
          Makes me feel like we own our data.
        </li>
        <li>
          <span className="font-semibold">The API.</span> I built a whole
          business around it and have no plans to integrate with other ChMSs any
          time soon as they don&apos;t have an easy to use public API. I also
          love what I&apos;ve been able to do in a church context as well for
          importing data from other services and using it for in-house tools.
        </li>
        <li>
          <span className="font-semibold">Good communities.</span>
        </li>
        <li>
          <span className="font-semibold">Public changelogs.</span>
        </li>
        <li>
          <span className="font-semibold">Amazing support team.</span>
        </li>
        <li>
          <span className="font-semibold">Services.</span> There&apos;s
          literally no other alternative. I&apos;ve tried to find something even
          close and it just doesn&apos;t exist.
        </li>
        <li>
          <span className="font-semibold">Church Center.</span> For some reason,
          many churches feel like they need to have their own custom app. So
          they sign up for something like Subsplash only to realize they have to
          maintain their own app. Church Center scratches the itch of having an
          app without the complexity.
        </li>
      </ArticleList>
      <SectionHeader>My biggest gripe with Church software</SectionHeader>
      <ArticleParagraph>
        I hate how many apps are needed in ministry (see{" "}
        <a
          href="/ideas/14-apps"
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          Do I really need 14 apps to join the team?
        </a>
        ).
      </ArticleParagraph>
      <ArticleParagraph>
        A mid-sized church could easily have an app stack that looks something
        like this:
      </ArticleParagraph>
      <ArticleList type="unordered">
        <li>
          <span className="font-semibold">A workplace messaging app</span>{" "}
          (i.e., Slack, Teams)
        </li>
        <li>
          <span className="font-semibold">A church management software</span>{" "}
          (i.e., PCO, Breeze)
        </li>
        <li>
          <span className="font-semibold">A church app</span> (i.e., Church
          Center, Subsplash)
        </li>
        <li>
          <span className="font-semibold">A giving platform</span> (i.e., PCO,
          Tithe.ly, Pushpay)
        </li>
        <li>
          <span className="font-semibold">An asset management app</span> (i.e.,
          Cheqroom, Sortly)
        </li>
        <li>
          <span className="font-semibold">An analytics app</span> (i.e.,
          Airtable, PowerBI)
        </li>
        <li>
          <span className="font-semibold">A cloud storage app</span> (i.e.,
          Dropbox, Google Drive)
        </li>
        <li>
          <span className="font-semibold">A project management tool</span>{" "}
          (i.e., Asana, Monday.com)
        </li>
        <li>
          <span className="font-semibold">A website tool</span> (i.e.,
          Squarespace, The Church Co)
        </li>
        <li>
          <span className="font-semibold">A texting tool</span> (i.e.,
          Clearstream, Text-In-Church)
        </li>
        <li>
          <span className="font-semibold">An email marketing tool</span> (i.e.,
          Church Space, Mailchimp)
        </li>
        <li>
          <span className="font-semibold">A forms tool</span> (i.e., Formstack,
          Google Forms, Typeform)
        </li>
        <li>
          <span className="font-semibold">A documents tool</span> (i.e., Google
          Docs, Notion)
        </li>
        <li>
          <span className="font-semibold">An HR platform</span> (i.e., BambooHR,
          Gusto)
        </li>
        <li>
          <span className="font-semibold">A QR code tool</span> (i.e., QR
          Planet, QR Code Kit)
        </li>
        <li>
          <span className="font-semibold">A social media scheduling tool</span>{" "}
          (i.e., Buffer, Hootsuite)
        </li>
        <li>
          <span className="font-semibold">A link page tool</span> (i.e.,
          Linktr.ee, Carrd)
        </li>
        <li>
          <span className="font-semibold">An AI tool</span> (i.e., ChatGPT,
          Claude)
        </li>
        <li>
          <span className="font-semibold">A training platform</span> (i.e.,
          Kajabi, Thinkific)
        </li>
        <li>
          <span className="font-semibold">A point of sale system</span> (i.e.,
          Square, Shopify)
        </li>
        <li>
          <span className="font-semibold">
            Their personal texts for communicating with volunteers, their small
            group, and congregants
          </span>{" "}
          (i.e., WhatsApp, iMessage)
        </li>
      </ArticleList>
      <ArticleParagraph>
        I&apos;m partially being dramatic, but this isn&apos;t too far from what
        we were using at Hillsong Online.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <mark>Planning Center does a lot of these things,</mark> but many of
        them fall short of being a full replacement. Instead, it actually just
        adds one more app/one more place to check.
      </ArticleParagraph>

      <SectionHeader>
        A note on permissions and multi-site churches
      </SectionHeader>
      <ArticleParagraph>
        Both at the smaller church I&apos;m at now and especially at Hillsong,
        the lack of granular permissions is a PAIN. I still get texts from
        Hillsong people asking me for solutions and I left two years ago.
      </ArticleParagraph>
      <ArticleParagraph>
        Hillsong Australia has 5 different PCO accounts by state to at least
        limit access and protect data.
      </ArticleParagraph>
      <ArticleParagraph>
        Multi-site is also hard with Church Center, esp. if each campus wants to
        do their own thing with it (they can&apos;t).
      </ArticleParagraph>
      <SectionHeader>PCO Sections</SectionHeader>
      <ArticleList>
        <li>
          <span className="font-semibold">Teams</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                I really wish Teams were not tied to service types. It makes
                them unusable for async teams. It was a huge pain for Church
                Online at Hillsong.
              </span>
            </li>
            <li>
              <span>
                No issue with the idea that a team <i>can</i> be tied to a
                service type, just that is <i>has</i> to be.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Chat</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                Related to the above, it&apos;s tied to services, so I
                can&apos;t really use it for staff. Happy to pay more for it.
              </span>
            </li>
            <li>
              <span>
                I also can&apos;t just start a convo with another admin, so I
                have to maintain multiple chat apps.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Dashboards</span>
        </li>
        <li>
          <span className="font-semibold">Lists</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>Rule-based lists and custom list.</span>
            </li>
            <li>
              <span>
                Rules are too hard to build for people who don&apos;t think in
                if-then statements (i.e., natural language).
              </span>
            </li>
            <li>
              <span>
                Need to be able to offset automation times. Right now,
                automations fire at 2am for auto-refreshing lists. Ideally this
                would be solved by letting you pick an hour of the day to
                refresh the list.
              </span>
            </li>
            <li>
              <span>
                Auto-delete list after <i>n</i> days. That or don&apos;t
                actually save every list after it&apos;s created. (This has some
                bad downstream effects though.)
              </span>
            </li>
            <li>
              <span>
                Filter to see which lists are auto-refreshing and which lists
                have automations.
              </span>
            </li>
            <li>
              <span>
                Filter to see which lists are auto-refreshing and which lists
                have automations.
              </span>
            </li>
            <li>
              <span>
                Why is bulk action icon a pencil? And why are bulk actions not
                under actions? (I think I get why, but it confuses me every
                time.)
              </span>
            </li>
            <li>
              <span>
                I&apos;d love to more easily see and export the list results
                breakdown popover.
              </span>
            </li>
            <li>
              <span>Some lists I just want for the total results number.</span>
            </li>
            <li>
              <span>
                Either in lists or just in forms, I&apos;d love to have form
                results filtering.
              </span>
            </li>
            <li>
              <span>
                I&apos;d like to see what lists a person is in from their people
                profile.
              </span>
            </li>
            <li>
              <span>
                If I add some filters on the People tab, I&apos;d love to save
                that filter as a list (or maybe a new concept of
                &quot;views&quot; if that doesn&apos;t get too muddy.)
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Workflows</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                Auto-assign workflow cards based on who is most connected to
                that person based on other involvement data.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">People Import</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                It might just be me, but profile matching <i>never</i> works for
                me in People. This has been true at both Good Shepherd and
                Hillsong. I know there&apos;s the remote ID, but I can never get
                that to work either and I can&apos;t find much support stuff on
                it. So in the past (and for Church Space) I&apos;ve had to build
                my own profile matching and linking logic.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Tasks</span>
        </li>
        <li>
          <span className="font-semibold">Resources</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>Checkout items separate from events.</span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Church Center</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                I <i>really</i> wish Church Center could be a website. I know a
                lot of people will split it so their website is for guest and
                Church Center is for new people, but I think this is just more
                confusing. It makes sense to the church staff, but it&apos;s not
                intuitive for congregants.
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Forms</span>
          <ArticleList type="unordered" indent>
            <li>
              <span>Paper forms.</span>
            </li>
            <li>
              <span>Embeds.</span>
            </li>
            <li>
              <span>Filtering of results.</span>
            </li>
            <li>
              <span>Better conditional logic.</span>
            </li>
            <li>
              <span>File downloads and inline images</span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Docs/Wiki 👀</span>
        </li>
        <li>
          <span className="font-semibold">
            Training and content platform 👀
          </span>
          <ArticleList type="unordered" indent>
            <li>
              <span>
                I&apos;ve built this one out as well, but I would love to have a
                content platform where I can do team trainings, make and host
                small group content, and be able to share resources with and
                access resources from other churches. (Article on this concept
                and how it can be used with forms, website pages, content, etc.
                soon.)
              </span>
            </li>
          </ArticleList>
        </li>
        <li>
          <span className="font-semibold">Point of Sale 👀</span>
        </li>
      </ArticleList>
      <SectionHeader>Notes on design</SectionHeader>
      <ArticleList>
        <li>
          <span className="font-semibold">Sticky headers and sidebars</span>
        </li>
        <li>
          <span className="font-semibold">
            Less wasted space on settings pages
          </span>
        </li>
        <li>
          <span className="font-semibold">
            Clear up settings; add vertical hierarchy. One thing per row.
          </span>
        </li>
      </ArticleList>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-empty-space.png"
        alt="Planning Center Home Announcement"
        width={1500}
        height={1500}
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//pco-involvment-details.png"
        alt="Planning Center Home Announcement"
        width={1500}
        height={1500}
      />

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
