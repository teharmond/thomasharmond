import { Metadata } from "next";
import ArticleHeader from "../../../../components/ArticleHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";

export const metadata: Metadata = {
  title: "Answer questions that bring you joy",
  description: "A simple heuristic for the next step",
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
        title="Answer questions that bring you joy"
        description="A simple heuristic for the next step"
      />
      <ArticleParagraph>
        Launching Church Space has led to a lot of reflecting on what I want for
        my life. Do I want to be a CEO in 5 years? Do I truly like development
        or is it the product work that keeps me going? How will running a
        business affect my home life as we think about starting a family in the
        next few years?
      </ArticleParagraph>
      <ArticleParagraph>
        These hypotheticals have been met with the realities of having paying
        customers, acquisition offers, job opportunities, and a rapidly
        expanding network.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        All of this has brought incredible highs, but it&apos;s equally brought
        a lot of self-induced stress as my mind has wandered through
        hypothetical after hypothetical as if I could somehow divine where each
        road before will lead.{" "}
      </ArticleParagraph>
      <ArticleParagraph>Spoiler: I can&apos;t. </ArticleParagraph>
      <ArticleParagraph>
        In fact, no path I&apos;ve even gone down in life has led to an expected
        destination.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        I didn&apos;t think going to youth group would lead to working in
        ministry. I didn&apos;t think moving to Sydney to be a worship leader
        would end with me working in IT/Digital. I didn&apos;t think my now wife
        saying no to a second date would two years later lead to an
        international long distance relationship and a beautiful, in-person
        marriage (good riddance long distance). I didn&apos;t think a tech
        director job would lead me to preaching semi-regularly to a
        congregation.
      </ArticleParagraph>
      <ArticleParagraph>
        Who knows where today&apos;s decisions will lead.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        As I try to manage my stress better, I&apos;m using a simple heuristic
        to take the next step:{" "}
        <mark>what questions bring me joy to answer?</mark>
      </ArticleParagraph>
      <ArticleParagraph>
        Right now, that&apos;s how software can help churches, so that&apos;s
        the direction I&apos;ll go. Who knows what I&apos;ll want to answer
        tomorrow.
      </ArticleParagraph>
      <ArticleParagraph>
        All I know is God has a funny way of working everything out in the end.
        I&apos;m so hopeful for the future, and I know He&apos;ll light the
        way.{" "}
      </ArticleParagraph>
      <div className="border-primary ml-4 flex gap-2 rounded-l border-l-8 py-3">
        <ArticleParagraph className="">
          <span className="font-semibold">
            &quot;All shall be well and all manner of things shall be
            well.&quot;
          </span>
          <br />
          <span className="pl-2 italic">— Julian of Norwich</span>
        </ArticleParagraph>
      </div>
      <div className="text-muted-foreground mt-4 border-t px-2 pt-6 text-sm font-semibold">
        July 30, 2025
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
