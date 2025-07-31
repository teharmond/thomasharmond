import SectionHeader from "@/components/SectionHeader";
import { ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArticleHeader from "../../../../components/ArticleHeader";
import ArticleParagraph from "../../../../components/ArticleParagraph";

const articles = [
  {
    title: "Answer questions that bring you joy",
    description: "A simple heuristic for the next step",
    link: "/ideas/questions-that-bring-joy",
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

export const metadata: Metadata = {
  title: "Churches Need Paper Forms",
  description: "Starting over from first principles to meet real needs",
};

export default function page() {
  return (
    <div className=" gap-4 flex flex-col">
      <ArticleHeader
        title="Churches Need Paper Forms"
        description="Starting over from first principles to meet real needs"
      />
      <SectionHeader>INTRODUCTION</SectionHeader>

      <ArticleParagraph>
        A few months ago, my wife came home from a church event with a large
        stack of paper.
      </ArticleParagraph>
      <ArticleParagraph>&quot;What are those?&quot; I asked. </ArticleParagraph>
      <ArticleParagraph className="italic">
        &quot;Paper forms.&quot;
      </ArticleParagraph>
      <ArticleParagraph>
        In that moment, eight hours of manual data entry flashed through my
        mind.
      </ArticleParagraph>
      <ArticleParagraph>
        It&apos;s easy to be cynical about this, and I see the sentiment online
        a lot: catch up with the times, pull out your phone, and fill in the
        form.
      </ArticleParagraph>
      <ArticleParagraph>
        But this is far from a compassionate solution. We have to go back to
        first principles. Rather than telling people who use our products that
        they need to work around <i>our</i> ideas and systems, we need to think
        about why they might want something, even an antiquated something, in
        the first place.
      </ArticleParagraph>
      <ArticleParagraph>
        For my wife, her reason is simple: when she puts a QR code on a screen
        and asks people to fill it out, she gets fewer responses and the digital
        abstraction leads to those responses being less personal.
      </ArticleParagraph>
      <ArticleParagraph>
        She&apos;s not alone in this. The past two churches I&apos;ve been at
        have paper forms everywhere: giving envelopes, new children&apos;s
        forms, prayer requests, praise reports, spiritual health assessments,
        surveys, connect forms, you name it.
      </ArticleParagraph>
      <ArticleParagraph>
        While the digital side of my brain hates to admit it, I think they have
        a place.
      </ArticleParagraph>
      <ArticleParagraph>
        In my own experience, I fill out paper forms right away whereas the
        digital ones sit on my todo list indefinitely. When I have paper in
        front of me, I feel an intentionality that I don&apos;t always feel on
        my phone. And to be honest, I&apos;m more likely to fill out the paper
        form in the back of the pew when I get bored during the sermon than
        filling out a digital one if I pull my phone out.
      </ArticleParagraph>
      <ArticleParagraph>
        <mark className="font-semibold">
          So churches should be using paper forms.
        </mark>{" "}
        Not in lieu of digital, but as a complement in a well-rounded system.
      </ArticleParagraph>
      <ArticleParagraph>
        But like most things, there&apos;s a catch.
      </ArticleParagraph>
      <ArticleParagraph>
        While paper forms give you more immediate and personal responses, they
        also create hours of admin work. If you want to capture this data
        digitally and use it in any formalized process, you have to input all
        the data by hand into your tool of choice. But most form tools—Planning
        Center included—don&apos;t let you manually input form data. So churches
        either have to create a separate process for each submission type or
        they have to bring the data together themselves in a secondary tool.
      </ArticleParagraph>
      <ArticleParagraph>Not ideal.</ArticleParagraph>
      <ArticleParagraph>
        So when I started working on{" "}
        <span className="inline ">
          <Link
            href="https://churchspace.co"
            className="inline items-baseline group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="underline decoration-2 underline-offset-2 group-hover:underline-offset-4 transition-all duration-300 ease-in-out">
              Church Space
            </span>
          </Link>
        </span>{" "}
        Forms, this was the core problem I wanted to solve.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//paper-digital-chart.png"
        alt="Paper and Digital Chart"
        width={1000}
        height={1000}
        className="mt-2 mb-10 w-[80%] mx-auto"
      />
      <SectionHeader>TOWARDS A SOLUTION</SectionHeader>
      <ArticleParagraph>
        To make this work, I first needed a way to build digital forms to serve
        as the backbone. It was easy enough to rework the email builder into a
        form builder, but I wanted to make this digital builder great, solving
        both needs a church has. I added advanced conditional logic, pages,
        every field type you could need, and content blocks to give extra info
        and resources to the submitter.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-builder.png"
        alt="Form Builder"
        width={1000}
        height={1000}
        className="mt-2  "
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-conditions.png"
        alt="Form Conditions"
        width={1000}
        height={1000}
        className="mt-2 mb-10 "
      />
      <ArticleParagraph>
        I then added in a way to link form fields to PCO fields and to have the
        form submissions go to a workflow card or profile note in PCO. A core
        part of the value that Church Space offers is that it keeps PCO as the
        source of truth for all data. This couldn&apos;t be the exception.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-pco-logic-one.png"
        alt="Form PCO Logic"
        width={1000}
        height={1000}
        className="mt-2  "
      />
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-pco-logic-two.png"
        alt="Form PCO Connection"
        width={1000}
        height={1000}
        className="mt-2 mb-10 "
      />
      <ArticleParagraph>
        Now, we needed a way to get the digital form on paper. For this, I used
        React PDF. Super fun tool. I defined the CSS for how each field type
        should render which allows me to pass the form schema to the function.
        We then filter out content blocks (other than text and dividers) and
        filter out file upload fields. The user can then download this PDF in
        multiple paper sizes to suit their needs.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//paper-form.png"
        alt="Paper Form"
        width={1000}
        height={1000}
        className="mt-2 mb-10 "
      />
      <ArticleParagraph>
        Once the user is ready to upload their submissions, they can open the
        site on their mobile device and scan them in. Each image is encoded to
        base64, batched together, and passed to a Trigger.dev background job
        along with the form schema. The job uses the Vercel AI SDK with Gemini
        2.0 Flash to analyze the forms and convert the data to JSON. We then use
        Zod to validate the results.{" "}
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//upload-paper-form.png"
        alt="Upload Paper Form"
        width={1000}
        height={1000}
        className="mt-2 mb-2 "
      />

      <ArticleParagraph>
        Because the fields are matched by title, people are able to create their
        own designs for their forms and use those instead. This also means you
        can take any paper form you already have printed and make a digital
        companion for it.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond//form-code.png"
        alt="Form Code"
        width={1000}
        height={1000}
        className="mt-2 mb-10 "
      />
      <ArticleParagraph>
        All the results are then added to the same table as the digital
        submissions so that your data is all in one place. This gives ultimate
        freedom to churches while keeping their data clean.
      </ArticleParagraph>
      <SectionHeader>WHAT&apos;S NEXT</SectionHeader>
      <ArticleParagraph>
        Churches are infinitely unique which is why I deeply believe there
        should be software of all sorts—forms, project management, communication
        tools—that is specially designed for churches. This is another step in
        that direction.
      </ArticleParagraph>
      <ArticleParagraph>
        I hope this tool helps those of us in ministry to better care for our
        people. We don&apos;t collect data to stack up vanity metrics; we do it
        because everything from a prayer request to an email unsubscribe tells
        us something about the people that we&apos;ve been entrusted to care
        for.{" "}
      </ArticleParagraph>
      <ArticleParagraph>
        There are still a lot of things to be worked out. What do you do with
        conditional fields on paper? If a JSON response fails the Zod
        validation, should you use a different model to try again? Should paper
        form submissions receive a submission confirmation email? What&apos;s
        the best UX for someone to correct submission values that were processed
        incorrectly? Is traditonal OCR better than visual intelegence for
        privacy? What other data privacy issues are there with this?
      </ArticleParagraph>
      <ArticleParagraph>
        I&apos;m looking forward to{" "}
        <Link
          href="/ideas/questions-that-bring-joy"
          target="_blank"
          className="underline hover:text-primary italic font-medium underline-offset-4"
        >
          answering these questions
          <ExternalLink className="h-4 w-4 inline ml-1 mb-1" />
        </Link>{" "}
        in the coming weeks as we get ready to roll it out to more churches.
      </ArticleParagraph>
      <ArticleParagraph>
        If you have any ideas or want access to the alpha, reach out to me at{" "}
        <a href="mailto:hey@thomasharmond.com" className="underline">
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
