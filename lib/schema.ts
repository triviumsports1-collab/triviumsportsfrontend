import { faqGroups, howItWorksAudiences, jobRoles } from "@/lib/content/marketing";
import { absoluteUrl, pages } from "@/lib/seo";
import { site } from "@/lib/site";

const orgId = `${site.url}/#organization`;
const websiteId = `${site.url}/#website`;

export function organizationNode() {
  return {
    "@type": ["Organization", "SportsOrganization"],
    "@id": orgId,
    name: site.name,
    url: site.url,
    email: site.email,
    sport: "Tennis",
    description: pages.home.description,
    areaServed: { "@type": "Country", name: "United States" },
    sameAs: [site.instagram, site.linkedin],
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: site.email,
        contactType: "customer service",
        availableLanguage: ["English"],
      },
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: site.url,
    name: site.name,
    publisher: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode(), websiteNode()],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": opts.type ?? "WebPage",
    "@id": `${absoluteUrl(opts.path)}#webpage`,
    url: absoluteUrl(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    inLanguage: "en-US",
  };
}

export function faqJsonLd(
  items: readonly { q: string; a: string }[],
  path: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(path),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function allFaqItems(): { q: string; a: string }[] {
  return faqGroups.flatMap((group) => [...group.items]);
}

export function howToJsonLd() {
  return howItWorksAudiences.map((audience) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How Trivium Sports works for ${audience.title.toLowerCase()}`,
    description: pages.howItWorks.description,
    step: audience.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: `Step ${index + 1}`,
      text,
    })),
  }));
}

export function howToFromSteps(
  name: string,
  description: string,
  steps: readonly { t: string; d: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.t,
      text: step.d,
    })),
  };
}

export function sportsOrgAboutJsonLd() {
  return {
    "@context": "https://schema.org",
    ...organizationNode(),
  };
}

export function jobRolesItemListJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "U.S. tennis coaching role types",
    itemListElement: jobRoles.map((role, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: role.title,
      description: role.body,
    })),
  };
}

export function jobPostingJsonLd(job: {
  slug: string;
  title: string;
  description: string;
  city: string | null;
  state: string | null;
  publishedAt: string | null;
  applyBy: string | null;
  roleType: string;
  visaStance: string;
}) {
  const visa =
    job.visaStance === "MUST_BE_AUTHORIZED"
      ? "U.S. work authorization required."
      : job.visaStance === "OPEN_TO_DISCUSSION"
        ? "The club is open to discussing work authorization. We work with immigration counsel."
        : "";
  const description = [job.description.replace(/[#*_]/g, "").slice(0, 4000), visa].filter(Boolean).join(" ");
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description,
    identifier: job.slug,
    datePosted: job.publishedAt ?? undefined,
    validThrough: job.applyBy ?? undefined,
    employmentType: job.roleType === "PLAYER_TRIAL" ? "TEMPORARY" : "CONTRACT",
    hiringOrganization: {
      "@type": "SportsOrganization",
      name: site.name,
      url: site.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city ?? undefined,
        addressRegion: job.state ?? undefined,
        addressCountry: "US",
      },
    },
    url: absoluteUrl(`/jobs/${job.slug}`),
    qualifications: visa || undefined,
    industry: "Tennis",
  };
}
