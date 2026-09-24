import { PageHero, Section } from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { pageMetadata } from "@/lib/seo";
import { routes, site } from "@/lib/site";

export const metadata = pageMetadata("privacy");

export default function PrivacyPage() {
  return (
    <main>
      <PageSeo page="privacy" crumbName="Privacy" />
      <PageHero
        crumbs={[{ name: "Privacy", href: routes.privacy }]}
        kicker="Legal"
        title="Privacy Policy"
        lede="Last updated 19 September 2026. This policy describes how Trivium Sports handles personal information on this website and in follow-up conversations — especially immigration and form data."
      />

      <Section tone="elevated">
        <div className="max-w-3xl space-y-10 text-base leading-7 text-ink-muted">
          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Who we are</h2>
            <p className="mt-3">
              Trivium Sports operates this tennis-exclusive website. Questions: {site.email}.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">What we collect</h2>
            <p className="mt-3">
              Intake and contact forms may include your name, email, phone, location, tennis
              background, club or academy details, and high-level authorization status (for
              example, that you are on OPT or STEM OPT). We do not request passport images, EAD
              cards, or full immigration forms through public web forms.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">
              Sensitive immigration and form data
            </h2>
            <p className="mt-3">
              When a placement conversation requires supporting documents (such as an Employment
              Authorization Document, passport biographical page, or government forms), we collect
              them only through a restricted channel — not through this marketing site. Those files
              are stored with encryption in transit and at rest, access is limited to personnel
              with a work reason, and downloads are recorded. We do not use immigration documents
              for advertising, and we do not sell them.
            </p>
            <p className="mt-3">
              Status fields on an intake are treated as confidential. Club counterparts receive
              only what is required to plan a lawful, on-court schedule — never document scans
              by default.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">How we use information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to intakes and messages</li>
              <li>To evaluate tennis fit with clubs, academies, or training plans</li>
              <li>To coordinate work authorization with you and licensed advisors as needed</li>
              <li>To meet legal, security, and record-keeping duties</li>
            </ul>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Sharing</h2>
            <p className="mt-3">
              We share information with service providers who host email, storage, or this website,
              under contracts that limit their use. We may share relevant tennis and scheduling
              details with a club or academy you asked us to introduce. We disclose information if
              required by law.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Retention</h2>
            <p className="mt-3">
              We keep inquiry records for as long as a conversation is active and for a reasonable
              period afterward to resume it. Immigration documents are retained only while needed
              for the placement or as required by law, then deleted or archived with restricted
              access.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Your requests</h2>
            <p className="mt-3">
              You may ask for access, correction, or deletion of personal information we hold,
              subject to legal exceptions. Email {site.email}.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Not legal advice</h2>
            <p className="mt-3">
              Nothing on this site is legal advice. Immigration decisions remain yours, with your
              DSO and counsel.
            </p>
          </article>
        </div>
      </Section>
    </main>
  );
}
