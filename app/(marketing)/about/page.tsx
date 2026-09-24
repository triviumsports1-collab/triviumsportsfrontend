import {
  Card,
  CtaBand,
  PageHero,
  PrimaryLink,
  SecondaryLink,
  Section,
} from "@/components/marketing/page-shell";
import { PageSeo } from "@/components/seo/page-seo";
import { legacyAbout, legacyHome } from "@/lib/content/legacy";
import { sportsOrgAboutJsonLd } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("about");

export default function AboutPage() {
  return (
    <main>
      <PageSeo page="about" crumbName="About" type="AboutPage" extras={[sportsOrgAboutJsonLd()]} />
      <PageHero
        crumbs={[{ name: "About", href: routes.about }]}
        kicker={legacyHome.shoes.kicker}
        title={legacyAbout.title}
        lede={legacyHome.shoes.body}
        actions={
          <>
            <PrimaryLink href={routes.contact}>Meet the Team</PrimaryLink>
            <SecondaryLink href={routes.howItWorks}>Who we are</SecondaryLink>
          </>
        }
      />

      <Section>
        <h2 className="text-3xl font-semibold tracking-tight">{legacyAbout.whoHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyAbout.whoBody}</p>
        <h2 className="mt-12 text-3xl font-semibold tracking-tight">{legacyHome.shoes.h2}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.shoes.body}</p>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">{legacyAbout.whyHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyAbout.whyBody}</p>
        <h2 className="mt-12 text-3xl font-semibold tracking-tight">{legacyAbout.approachHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyAbout.approachLede}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {legacyAbout.approach.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <Section>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
          {legacyAbout.specialistsKicker}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{legacyAbout.foundersHeading}</h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {legacyAbout.founders.map((person) => (
            <li key={person.name}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6">
                <h3 className="text-xl font-semibold tracking-tight">{person.name}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-deep">{person.role}</p>
                <p className="mt-4 text-sm leading-6 text-ink-muted">{person.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="elevated">
        <h2 className="text-3xl font-semibold tracking-tight">{legacyHome.mission.h2}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.mission.p1}</p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.mission.p2}</p>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">{legacyHome.mission.p3}</p>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {legacyHome.standards.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <CtaBand title={legacyAbout.ctaTitle} lede={legacyAbout.ctaLede} href={routes.contact} label="Send Message" />
    </main>
  );
}
