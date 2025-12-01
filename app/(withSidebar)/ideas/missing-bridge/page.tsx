import { Metadata } from "next";
import ArticleHeader from "../../../../components/ArticleHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";
import ArticleList from "@/components/ArticleList";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "The missing bridge in Church software",
  description: "Why we need a GitHub for ministry resources",
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
        title="The missing bridge in Church software"
        description="Why we need a GitHub for ministry resources"
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//church-connections.png"
        alt="Form Builder"
        width={1920}
        height={1920}
        className="mt-2"
      />
      <ArticleParagraph>
        I love open source software. No app on the internet would exist without
        it. But more than the packages and source code that it gives me, I love
        the ethos that lies behind it.
      </ArticleParagraph>

      <ArticleList type="unordered" indent>
        <li>
          <span>Not everything needs to be commercialized.</span>
        </li>
        <li>
          <span>
            Sometimes the act of making the thing is the reward in and of
            itself.
          </span>
        </li>
        <li>
          <span>Others have helped you, so now you want to help others. </span>
        </li>
      </ArticleList>

      <ArticleParagraph>
        Simply put, &quot;It is more blessed to give than to receive.&quot;
      </ArticleParagraph>
      <ArticleParagraph>
        As you would expect, churches have this ethos as well. When I was at
        Hillsong, people would reach out all the time asking for copies of our
        resources and how we do certain things. With joy, we gave these things
        away. At Good Shepherd, we give our VBS decorations and resources to a
        church down the road for their VBS that happens the following week.
        Churches like Life.Church have their{" "}
        <Link
          className="hover:text-primary font-medium italic underline underline-offset-4"
          href="https://open.life.church/"
          target="_blank"
        >
          Open Network
        </Link>
        , Passion City Church has{" "}
        <Link
          className="hover:text-primary font-medium italic underline underline-offset-4"
          href="https://passionequip.com/"
          target="_blank"
        >
          Passion Equip
        </Link>
        , and what God has done through Bridgetown Church is why{" "}
        <Link
          className="hover:text-primary font-medium italic underline underline-offset-4"
          href="https://www.practicingtheway.org/"
          target="_blank"
        >
          Practicing the Way
        </Link>{" "}
        exists.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        All that is to say,{" "}
        <mark>churches want to share resources with each other.</mark>{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        The benefit is obvious. A common sentiment among church staff is feeling
        like they have too much to do in too many areas. They have to create
        forms, processes, content, rosters, and service plans all while caring
        for their community. And not only that, they are expected to do each of
        these things with excellence.
      </ArticleParagraph>
      <ArticleParagraph>
        Additionally, most churches need the exact same things. Why spend time
        having everyone create their own version of it? We all benefit when we
        create our thing with excellence, share it with others, and receive in
        return the blessing of other&apos;s hard work.
      </ArticleParagraph>
      <ArticleParagraph>
        For churches who are a part of an established denomination, the means
        for this resource sharing are largely in place. Talk with your deacon,
        reach out to your sister church. But with the rise of non-denominational
        and unaffiliated churches, for many, those means don&apos;t exists. This
        means we have to rely on decentralized community forums and the networks
        we&apos;re able to create ourselves.{" "}
      </ArticleParagraph>
      <ArticleParagraph className="font-semibold">
        <mark>
          I believe there needs to exists a solution like GitHub for church
          resources where we can use the work of others (clone), remix it
          (fork), and share it back for anyone else to use (pull).
        </mark>
      </ArticleParagraph>
      <ArticleParagraph>This could play out in a few ways:</ArticleParagraph>
      <ArticleParagraph>
        <span className="font-semibold">Option one</span> would be every app for
        themselves. Church Space could add a way to share and remix email
        templates, Planning Center could add a way to share and remix workflows
        and forms, The Church Co could add a way to share and remix webpages.
        This is the easiest (and most realistic) option.
      </ArticleParagraph>
      <ArticleParagraph>
        Say I want to make a form for collecting photography consent. I could go
        to PCO, click new form, and then I would have the option to start from
        scratch or I could browse a library of templates other churches have
        shared. I click add, and then my form is populated with a great starting
        point for the form that I can tweak to meet the needs of our legal and
        compliance teams.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <span className="font-semibold">Option two</span> would be a centralized
        platform. I go to this platform, I search for photography consent forms,
        and then I can click an import button that will use the platform&apos;s
        API to add it to Planning Center, Formstack, The Church Co, or whatever
        my form tool of choice is. This has the added benefit that it&apos;s not
        tied to one platform. This means more churches could share their
        resources with more people. There would be some technical challenges
        with getting schemas to match and handling cases where one platform
        doesn&apos;t support the same features as another, but I believe these
        things could be worked out.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        <span className="font-semibold">Option three</span> would be a shared
        standard. This would be like Git itself. PCO, Church Space, The Church
        Co, and so on could adopt a standard protocol to share content and
        resources cross-apps. This gives the native, in-platform benefit of
        option one combined with the wider base of contributors from option
        two.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Due to technical complexities and market incentives, I realistically
        think option one is the only one that will happen. Nevertheless, the
        ethos that sits behind this idea is something I would love to see more
        of in church software.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        Imagine if I could import a “New to Faith” course with one click to a
        content platform and adapt that to fit our church and our beliefs? What
        if I could import a staff page to my website? Or if I could import a
        drip campaign for first-time givers? What about a service plan for an
        Easter service, pre-loaded with things I would never have thought of? Or
        even if I could share templates of our HR materials to save new and
        understaffed churches the time? The options are endless.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I really believe this is the ethos of Christ, and I hope that it can
        become the ethos of the applications that assist those serving His
        Church.{" "}
      </ArticleParagraph>
      <div className="text-muted-foreground mt-4 border-t px-2 pt-6 text-sm font-semibold">
        August 4, 2025
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
