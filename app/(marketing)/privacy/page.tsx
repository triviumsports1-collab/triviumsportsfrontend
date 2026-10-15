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
        lede="Last updated 15 October 2026. This policy describes how Trivium Sports Inc. handles personal information submitted through this website."
      />

      <Section tone="elevated">
        <div className="max-w-3xl space-y-10 text-base leading-7 text-ink-muted">
          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Who we are</h2>
            <p className="mt-3">
              Trivium Sports Inc. operates this website. Questions: {site.email}.
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
            <h2 className="text-2xl font-semibold tracking-tight text-ink">How we use information</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to intakes and messages</li>
              <li>To evaluate tennis fit with clubs, academies, or training plans</li>
              <li>When a conversation needs it, so we can work with immigration counsel</li>
              <li>To meet legal duties that apply to the information we actually hold</li>
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
              period afterward so we can resume it. Public forms on this site do not ask you to
              upload passports or employment-authorization cards.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Cookies</h2>
            <p className="mt-3">
              This public website does not use analytics or advertising cookies. We do not run a
              third-party analytics tool on these pages. If you sign in to the staff application,
              that application sets a session cookie so you can stay signed in. That cookie is not
              used to advertise.
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
              Nothing on this site is legal advice. We work with immigration counsel. Immigration
              decisions remain yours, with your DSO.
            </p>
          </article>
        </div>
      </Section>
    </main>
  );
}
