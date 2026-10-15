import { HomeHero } from "@/components/marketing/home-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/schema";
import { pageMetadata, pages } from "@/lib/seo";
import { routes } from "@/lib/site";

export const metadata = pageMetadata("home");

export default function Home() {
  return (
    <main id="top" className="flex-1">
      <JsonLd
        data={webPageJsonLd({
          path: pages.home.path,
          name: pages.home.title,
          description: pages.home.description,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Home", path: routes.home }])}
      />
      <HomeHero />

      <section className="bg-canvas-elevated pt-10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
            How it works
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            From first conversation to on-court presence.
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Share your tennis story",
                body: "Coaches, players, and club directors each complete a short intake so we understand the calendar, not a generic résumé.",
              },
              {
                step: "02",
                title: "Match with U.S. tennis clubs",
                body: "We introduce profiles to academies and clubs that need reliable presence for clinics and private lessons.",
              },
              {
                step: "03",
                title: "Step onto the court",
                body: "Once both sides are aligned, Trivium coordinates the professional next steps so the club can put coaches on the schedule.",
              },
            ].map((item) => (
              <li key={item.step}>
                <p className="text-3xl font-semibold tabular-nums text-brand">{item.step}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink-muted">{item.body}</p>
              </li>
            ))}
          </ol>
          <a
            href={routes.howItWorks}
            className="mt-10 inline-flex min-h-11 items-center font-semibold text-brand-deep hover:text-ink"
          >
            See steps by audience →
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-ink text-canvas-elevated">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
            Coaching after college
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">
            Your last dual match does not have to be the end of serious tennis.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/75">
            Collegiate tennis is a language U.S. clubs understand. We explain Optional Practical
            Training and STEM OPT for former college players, then help with the club introduction.
            We work with immigration counsel.
          </p>
          <a
            href={routes.afterCollege}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            Read the OPT path
          </a>
        </div>
      </section>

      <section className="border-t border-line bg-canvas-elevated">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-deep">
            Get started
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">
            Tell us which side of the net you are on.
          </h2>
          <p className="mt-4 text-base leading-7 text-ink-muted">
            The intake begins by choosing Coach, Player, or Club — then we ask the questions that
            actually qualify the conversation.
          </p>
          <a
            href={routes.getStarted}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-brand px-7 text-base font-semibold text-ink hover:bg-brand-deep hover:text-canvas-elevated"
          >
            Open the intake
          </a>
        </div>
      </section>
    </main>
  );
}
