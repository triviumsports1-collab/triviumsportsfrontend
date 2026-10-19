import Image from "next/image";
import {
  Card,
  CtaBand,
  MediaSplit,
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
        lede="Trivium Sports introduces tennis coaches and players to U.S. clubs and academies. The work is measured by how carefully people are placed."
        image="/images/about-court.jpg"
        imageAlt="Tennis club grounds with several outdoor courts"
        actions={
          <>
            <PrimaryLink href="#team">Meet the team</PrimaryLink>
            <SecondaryLink href="#who-we-are">Who we are</SecondaryLink>
          </>
        }
      />

      <Section id="who-we-are">
        <MediaSplit src="/images/home-body.jpg" alt="Morning light across an empty hard court">
          <h2 className="text-3xl font-semibold tracking-tight">{legacyAbout.whoHeading}</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyAbout.whoBody}</p>
          <h2 className="mt-10 text-3xl font-semibold tracking-tight">{legacyHome.shoes.h2}</h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">{legacyHome.shoes.body}</p>
        </MediaSplit>
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

      <Section id="team">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
          {legacyAbout.specialistsKicker}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{legacyAbout.foundersHeading}</h2>
        <ul className="mt-10 grid gap-6 lg:grid-cols-3">
          {legacyAbout.founders.map((person) => (
            <li key={person.name}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6">
                <div className="rounded-2xl bg-brand/10 p-1.5">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={500}
                    height={500}
                    className="aspect-square w-full rounded-[0.85rem] object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{person.name}</h3>
                <p className="mt-2 text-sm font-semibold text-brand-deep">{person.role}</p>
                <p className="mt-4 text-sm leading-6 text-ink-muted">{person.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-3xl font-semibold tracking-tight">{legacyAbout.advisoryHeading}</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-muted">
          Juan Carlos and Miguel advise Trivium on tennis talent and coach development.
        </p>
        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          {legacyAbout.advisors.map((person) => (
            <li key={person.name}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-canvas-elevated p-6">
                <div className="rounded-2xl bg-brand/10 p-1.5">
                  <Image
                    src={person.photo}
                    alt={person.name}
                    width={500}
                    height={500}
                    className="aspect-square w-full rounded-[0.85rem] object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{person.name}</h3>
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
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {legacyHome.standards.map((item) => (
            <Card key={item.title} title={item.title}>
              <p>{item.body}</p>
            </Card>
          ))}
        </ul>
      </Section>

      <CtaBand title={legacyAbout.ctaTitle} lede={legacyAbout.ctaLede} href={routes.contact} label="Send message" />
    </main>
  );
}
