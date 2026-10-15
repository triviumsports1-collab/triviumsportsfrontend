import type { Metadata } from "next";
import { jobsBoardPublic, routes, site } from "@/lib/site";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
};

type MarketingRoute = Exclude<keyof typeof routes, "login" | "dashboard">;

export const pages: Record<MarketingRoute, SeoPage> = {
  home: {
    path: routes.home,
    title: "Tennis Coaches for U.S. Clubs | International & Collegiate",
    description:
      "Trivium Sports places international and post-collegiate tennis coaches with U.S. clubs and academies. OPT, STEM OPT, and club-ready professionals.",
    keywords: [
      "tennis coaches USA",
      "international tennis coaches",
      "U.S. tennis clubs",
      "tennis academy coaches",
    ],
  },
  coaches: {
    path: routes.coaches,
    title: "Tennis Coaches in the USA | OPT and STEM OPT",
    description:
      "For international tennis coaches already in the United States on OPT or STEM OPT. Introductions to U.S. clubs and academies. We work with immigration counsel.",
    keywords: [
      "international tennis coaches USA",
      "OPT tennis coach",
      "STEM OPT tennis coach",
      "tennis coach already in United States",
    ],
  },
  afterCollege: {
    path: routes.afterCollege,
    title: "Coaching after College Tennis | OPT and STEM OPT",
    description:
      "Optional Practical Training and STEM OPT, explained for former college tennis players who want to coach at U.S. clubs. We work with immigration counsel and do not decide eligibility.",
    keywords: [
      "coaching after college tennis",
      "OPT tennis coaching",
      "STEM OPT tennis",
      "college tennis to coaching",
      "Optional Practical Training tennis coach",
    ],
  },
  jobs: {
    path: routes.jobs,
    title: "Tennis Coaching Jobs USA | Club and Academy Roles",
    description:
      "Club professional, high-performance, junior development, and director-adjacent tennis roles at U.S. clubs. Tell us about your background for a considered introduction.",
    keywords: [
      "tennis coaching jobs USA",
      "club tennis pro jobs",
      "high performance tennis coach United States",
      "tennis academy coach jobs",
    ],
  },
  jobsBoard: {
    path: routes.jobsBoard,
    title: "Open Tennis Coaching Roles at U.S. Clubs",
    description:
      "Open tennis coaching roles at U.S. clubs and academies, listed when a club role is ready to share.",
    keywords: [
      "tennis coaching jobs USA",
      "U.S. tennis club coaching roles",
      "published tennis coach openings",
    ],
  },
  players: {
    path: routes.players,
    title: "Tennis Player Management USA | Academy Placement",
    description:
      "Player management for international adults: U.S. academy placement, training blocks, and competition planning. Not college recruiting.",
    keywords: [
      "international tennis academy USA",
      "tennis training United States",
      "tennis competition planning USA",
      "academy placement tennis",
    ],
  },
  clubs: {
    path: routes.clubs,
    title: "Hire Tennis Coaches USA | Clubs and Academies",
    description:
      "Curated shortlists of international tennis coaches for U.S. clubs and academies, with retention check-ins and a single point of contact.",
    keywords: [
      "tennis coaches for clubs",
      "tennis academy staffing",
      "work authorization tennis coaches",
      "U.S. tennis club coaches",
    ],
  },
  howItWorks: {
    path: routes.howItWorks,
    title: "How Trivium Sports Works | Tennis Coaches, Players, and Clubs",
    description:
      "Step-by-step: how Trivium Sports works with tennis coaches, international players, and U.S. clubs — intake, review, introduction, on-court presence.",
    keywords: [
      "how Trivium Sports works",
      "tennis coach placement USA",
      "tennis academy placement process",
    ],
  },
  about: {
    path: routes.about,
    title: "About Trivium Sports | Tennis Coaching Agency USA",
    description:
      "Trivium Sports introduces tennis coaches and players to U.S. clubs and academies. Meet the founder and the advisory board.",
    keywords: [
      "Trivium Sports",
      "tennis agency USA",
      "tennis coaching agency",
    ],
  },
  faq: {
    path: routes.faq,
    title: "Tennis Coaching FAQ | Coaches, Players & U.S. Clubs",
    description:
      "Answers for OPT tennis coaches, international players, and U.S. club directors working with Trivium Sports. We work with immigration counsel.",
    keywords: [
      "tennis coaching FAQ",
      "OPT tennis coach questions",
      "U.S. tennis club coaches FAQ",
    ],
  },
  contact: {
    path: routes.contact,
    title: "Contact Trivium Sports | Tennis Desk",
    description:
      "Email, WhatsApp, and social channels for Trivium Sports, plus a message form for tennis coaches, players, and U.S. clubs.",
    keywords: ["contact Trivium Sports", "tennis coaching agency contact"],
  },
  getStarted: {
    path: routes.getStarted,
    title: "Get Started | Tennis Coach, Player, or Club",
    description:
      "Start with Trivium Sports by choosing tennis coach, player, or club. We ask only the questions that fit that path.",
    keywords: [
      "Trivium Sports intake",
      "tennis coach application USA",
      "tennis club request coaches",
    ],
  },
  privacy: {
    path: routes.privacy,
    title: "Privacy Policy | Trivium Sports Tennis",
    description:
      "How Trivium Sports Inc. handles personal information submitted on this tennis website. Public forms do not request passport or EAD uploads.",
    keywords: ["Trivium Sports privacy policy"],
  },
};

export function absoluteUrl(path: string) {
  if (path === "/" || path === "") return site.url;
  return `${site.url}${path}`;
}

export function pageMetadata(key: keyof typeof pages): Metadata {
  const page = pages[key];
  const url = absoluteUrl(page.path);
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    robots:
      key === "jobsBoard" && !jobsBoardPublic
        ? { index: false, follow: false }
        : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: page.title,
      description: page.description,
      locale: "en_US",
      images: [{ url: absoluteUrl("/opengraph-image"), alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
