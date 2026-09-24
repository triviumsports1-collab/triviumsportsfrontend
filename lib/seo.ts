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
    title: "coaching jobs in USA for coaches | coach hiring with visa support",
    description:
      "You have real in-sport experience. We help international coaches and former student-athletes secure coaching placements with vetted U.S. clubs, academies, and schools across youth and high-performance environments.",
    keywords: [
      "international tennis coaches USA",
      "OPT tennis coach",
      "STEM OPT tennis coach",
      "tennis coach already in United States",
    ],
  },
  afterCollege: {
    path: routes.afterCollege,
    title: "From Student-Athlete to Coach: Your Next Chapter Starts Here",
    description:
      "Turn high performance habits into coaching impact in the U.S. Get step by step OPT support, interview prep, curated introductions, and mentorship through your first season.",
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
    title: "Coaching Jobs USA | Sports Recruitment Agency",
    description:
      "We connect graduating athletes and qualified talent with vetted U.S. clubs and academies. Expect clear steps, visa support, and lasting mentorship.",
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
    title: "College Sports Recruitment USA | Athlete Placement",
    description:
      "Years of elite training translate directly to value in the role. Your habits, judgment, and leadership are what strong programs seek.",
    keywords: [
      "international tennis academy USA",
      "tennis training United States",
      "tennis competition planning USA",
      "academy placement tennis",
    ],
  },
  clubs: {
    path: routes.clubs,
    title: "Hire Sports Coaches USA | Recruitment Agency",
    description:
      "Each year, standout international graduates are ready to coach in the U.S. We deliver curated shortlists and handle compliance so your program can move fast.",
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
    title: "Sports Recruitment Agency USA | About Trivium",
    description:
      "Trivium Sports is a coach-centered initiative that connects international student-athletes and early-career coaches with trusted U.S. sports organizations.",
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
