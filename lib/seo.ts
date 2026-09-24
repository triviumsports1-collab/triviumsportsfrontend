import type { Metadata } from "next";
import { routes, site } from "@/lib/site";

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
      "Trivium Sports is a tennis-exclusive agency placing international and post-collegiate coaches with U.S. clubs and academies. OPT, STEM OPT, and club-ready professionals.",
    keywords: [
      "tennis coaches USA",
      "international tennis coaches",
      "U.S. tennis clubs",
      "tennis academy coaches",
    ],
  },
  coaches: {
    path: routes.coaches,
    title: "International Tennis Coaches in the U.S. (OPT & STEM OPT)",
    description:
      "For international tennis coaches already in the United States on OPT or STEM OPT. Trivium introduces club-ready coaches to U.S. tennis clubs and academies.",
    keywords: [
      "international tennis coaches USA",
      "OPT tennis coach",
      "STEM OPT tennis coach",
      "tennis coach already in United States",
    ],
  },
  afterCollege: {
    path: routes.afterCollege,
    title: "Coaching After College: OPT & STEM OPT for Tennis Players",
    description:
      "How OPT and STEM OPT can support a tennis coaching chapter after U.S. college eligibility — and how Trivium Sports helps former players reach U.S. clubs. Educational, not legal advice.",
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
    title: "Tennis Coaching Jobs USA | Club Pro & High-Performance",
    description:
      "Types of U.S. tennis coaching roles: club professional, high-performance, and junior development. Not a live job board — tell Trivium Sports about you.",
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
      "Published tennis coaching opportunities at U.S. clubs and academies. Server-rendered listings — titles and locations are in the page HTML.",
    keywords: [
      "tennis coaching jobs USA",
      "U.S. tennis club coaching roles",
      "published tennis coach openings",
    ],
  },
  players: {
    path: routes.players,
    title: "International Tennis Players | U.S. Training & Academies",
    description:
      "Trivium Sports helps international tennis players with U.S. training blocks, academy placement, and competition planning — a professional plan, not a tourist week.",
    keywords: [
      "international tennis academy USA",
      "tennis training United States",
      "tennis competition planning USA",
      "academy placement tennis",
    ],
  },
  clubs: {
    path: routes.clubs,
    title: "Tennis Coaches for U.S. Clubs & Academies",
    description:
      "Trivium coaches work at clubs. We source tennis coaches for U.S. clubs and academies and coordinate work authorization so directors keep the on-court standard.",
    keywords: [
      "tennis coaches for clubs",
      "tennis academy staffing",
      "work authorization tennis coaches",
      "U.S. tennis club coaches",
    ],
  },
  howItWorks: {
    path: routes.howItWorks,
    title: "How Trivium Sports Works | Coaches, Players & Clubs",
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
    title: "About | Tennis Background & Compliance",
    description:
      "Trivium Sports was founded by tennis people — collegiate competition and club coaching — with a strict standard for compliance and work authorization coordination.",
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
      "Answers for OPT tennis coaches, international players, and U.S. club directors working with Trivium Sports. Immigration questions belong with your DSO and counsel.",
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
    title: "Get Started | Coach, Player, or Club Intake",
    description:
      "Trivium Sports intake: choose Coach, Player, or Club first, then answer tennis questions that qualify the conversation.",
    keywords: [
      "Trivium Sports intake",
      "tennis coach application USA",
      "tennis club request coaches",
    ],
  },
  privacy: {
    path: routes.privacy,
    title: "Privacy Policy | Immigration & Form Data",
    description:
      "How Trivium Sports collects and protects personal information, including sensitive immigration status and form data. Public forms do not request passport or EAD uploads.",
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
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: page.title,
      description: page.description,
      locale: "en_US",
      images: [{ url: "/opengraph-image", alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}
