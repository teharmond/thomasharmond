import ArticleHeader from "@/components/ArticleHeader";
import ArticleList from "@/components/ArticleList";
import ArticleParagraph from "@/components/ArticleParagraph";
import SectionHeader from "@/components/SectionHeader";
import Image from "next/image";

export default function page() {
  return (
    <div className="flex flex-col gap-4">
      <ArticleHeader
        title="Email Add-Ons for Planning Center"
        description="What would be needed for email providers to better integrate with Planning Center."
      />
      <ArticleParagraph className="bg-muted text-muted-foreground mt-4 rounded-md p-2 px-3 text-sm leading-relaxed">
        Obviously this is written from the perspective of Flowforth, but I think
        the same principles would work for any bulk emailing platform (such as
        Clearstream, TextInChurch, StudioC, etc.).
      </ArticleParagraph>
      <SectionHeader>01. MVP OF AN EMAIL ADD-ON</SectionHeader>
      <ArticleParagraph>
        I think an MVP of an email add-on would be fairly simple.
      </ArticleParagraph>
      <ArticleParagraph>
        From a list, you can click the &quot;message&quot; button, and then
        select &quot;Send email with Flowforth&quot; (or another email add-on).
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/send-with-flowforth.png"
        alt="Email add-on modal"
        width={1920}
        height={1920}
        className="rounded-md"
      />
      <ArticleParagraph>
        The modal could be nearly identical to the default send-email modal that
        already exists in PCO. The only changes I would make are supplying the
        &quot;from&quot; addresses from their Flowforth account (or from any
        other email provider), adding a dropdown for email category (a Flowforth
        concept), and potentially providing some custom merge tags. I think it
        would work to use Planning Center email templates for the content
        templates.
      </ArticleParagraph>
      <ArticleParagraph>
        The actual style of the email can be customized and stored in Flowforth
        so that it&apos;s as light as possible on the Planning Center side.
      </ArticleParagraph>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/flowforth-modal.png"
        alt="Email add-on modal"
        width={1920}
        height={1920}
        className="rounded-md"
      />
      <SectionHeader>02. NICE TO HAVE</SectionHeader>
      <ArticleParagraph>
        Some other things that would be helpful to making a great add-on for
        emails:
      </ArticleParagraph>
      <ArticleList type="unordered">
        <li>
          Have a &quot;send with Flowforth&quot; option in the default email
          modal when a list has over 500 people (similar to the send with
          Mailchimp option). Maybe this is a dropdown in case there are multiple
          email providers available.
        </li>
        <li>
          Modifying the &quot;Sync with Mailchimp&quot; feature to be used for
          any email (or texting) provider so that people can limit how much data
          they give to the add-on. So instead of the
          &quot;MailchimpSyncStatus&quot; endpoint, it could be
          &quot;AddOnSyncStatus.&quot; A list can then be synced with
          Clearstream for texting, but not with Flowfoth as it&apos;s not meant
          for email. The syncing itself can be done on the provider&apos;s end;
          just use a webhook to tell the provider that they have access.
          Possibly let the provider write back if the list has been synced.
        </li>
      </ArticleList>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/add-on-sync.png"
        alt="Email add-on modal"
        width={1920}
        height={1920}
        className="rounded-md"
      />
      <ArticleList type="unordered">
        <li>
          Ability to have Flowforth emails show up in the lists message history
          tab (https://people.planningcenteronline.com/lists/emails).{" "}
        </li>
      </ArticleList>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/list-email-history.png"
        alt="Email add-on modal"
        width={1920}
        height={1920}
        className="rounded-md"
      />
      <ArticleList type="unordered">
        <li>
          A way to bulk insert records for a person&apos;s communications so
          that an email sent with Flowforth can show on a person&apos;s profile.
          Ideally, this would also show a status for the email (such as opened,
          unsubscribed, etc.). Email data can be helpful pastoral data, so the
          more that lives in Planning Center — the church&apos;s source of truth
          — the better.
        </li>
      </ArticleList>
      <Image
        src="https://heucweqplwpswrlbexez.supabase.co/storage/v1/object/public/thomasharmond/person-comms.png"
        alt="Email add-on modal"
        width={1920}
        height={1920}
        className="rounded-md"
      />
      <ArticleList type="unordered">
        <li>
          A list shares webhook so I can sync a list that is shared with the
          integration account right when that share happens. However, if there
          is the provider sync status, this is no longer needed.
        </li>
        <li>
          Ideally, using the add-on in People requires that a person has the
          &quot;Can email lists&quot; permission.
        </li>
        <li>
          I&apos;d love to have the ability for people to use Flowforth (or any
          comms add-on) as part of an automation on a list or a form.{" "}
        </li>
      </ArticleList>
      <SectionHeader>03. UNRELATED TO THE ADD-ON</SectionHeader>
      <ArticleParagraph>
        In general, it&apos;d be cool to have &quot;automated steps&quot; in
        Workflows. Right now, you have to build a list for when someone finishes
        a step and then add an automation to that. It would be great to be able
        to see and manage that within the workflow itself. This would make it
        easier to get the full picture of someone&apos;s journey through the
        workflow.
      </ArticleParagraph>
    </div>
  );
}
