import Image from "next/image";
import { routes } from "@/lib/site";

function ArrowIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CoachIcon() {
  return (
    <svg className="h-8 w-8 text-brand" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="10" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M8 26c1.5-5 4.2-7.5 8-7.5S22.5 21 24 26"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ClubIcon() {
  return (
    <svg className="h-8 w-8 text-brand" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 26V12l10-6 10 6v14H6Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M13 26v-8h6v8" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

function PlayerIcon() {
  return (
    <svg className="h-8 w-8 text-brand" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="16" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M10 26v-7c0-2.2 2.7-4 6-4s6 1.8 6 4v7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const featureCards = [
  {
    href: routes.coaches,
    title: "For Coaches",
    body: "Get matched with U.S. opportunities and let us coordinate work authorization.",
    link: "Explore for Coaches",
    icon: CoachIcon,
  },
  {
    href: routes.clubs,
    title: "For Clubs",
    body: "Find qualified international tennis coaches. Trivium coaches work at clubs.",
    link: "Explore for Clubs",
    icon: ClubIcon,
  },
  {
    href: routes.players,
    title: "For Players",
    body: "Access coaching and support for your next chapter in the United States.",
    link: "Explore for Players",
    icon: PlayerIcon,
  },
] as const;

export function HomeHero() {
  return (
    <section className="relative">
      <div className="relative isolate min-h-[42rem] overflow-hidden sm:min-h-[48rem] lg:min-h-[52rem]">
        <Image
          src="/images/hero-tennis.jpg"
          alt="Tennis coach and player training together on an outdoor court"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[78%_center]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#07140e] via-[#07140e]/75 to-transparent lg:via-[#07140e]/55"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#07140e]/70 via-transparent to-black/25"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto flex min-h-[42rem] max-w-6xl flex-col justify-center px-4 pb-36 pt-28 sm:min-h-[48rem] sm:px-6 sm:pb-40 lg:min-h-[52rem] lg:pb-44 lg:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/80 sm:text-sm">
            International talent. U.S. opportunity.
          </p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            <span className="block">Tennis careers</span>
            without <span className="text-brand">borders.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
            Trivium Sports connects international tennis coaches with U.S. clubs, academies, and
            touring professionals — and coordinates the visa and immigration process so you can
            focus on tennis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={routes.getStarted}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-7 text-base font-semibold text-white hover:bg-brand-deep"
            >
              Find Your Path
              <ArrowIcon />
            </a>
            <a
              href={routes.howItWorks}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white px-7 text-base font-semibold text-white hover:bg-white/10"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-28 grid max-w-6xl gap-4 px-4 pb-6 sm:-mt-32 sm:px-6 md:grid-cols-3 lg:-mt-36">
        {featureCards.map((card) => (
          <article
            key={card.title}
            className="flex flex-col rounded-2xl border border-line bg-white px-6 pb-6 pt-8 text-center shadow-[0_18px_50px_rgba(15,28,22,0.12)]"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center">
              <card.icon />
            </div>
            <h2 className="mt-4 text-xl font-bold tracking-tight text-ink">{card.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-6 text-ink-muted">{card.body}</p>
            <a
              href={card.href}
              className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-deep hover:text-ink"
            >
              {card.link}
              <ArrowIcon />
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
