export const site = {
  name: "Trivium Sports",
  url: "https://triviumsports.com",
  email: "hello@triviumsports.com",
  whatsappE164: process.env.NEXT_PUBLIC_WHATSAPP_E164 ?? "13055550148",
  whatsappDisplay: process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY ?? "+1 (305) 555-0148",
  instagram: "https://www.instagram.com/triviumsports",
  linkedin: "https://www.linkedin.com/company/triviumsports",
} as const;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${site.whatsappE164}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const routes = {
  home: "/",
  coaches: "/coaches",
  afterCollege: "/coaching-after-college",
  jobs: "/tennis-coaching-jobs-usa",
  players: "/players",
  clubs: "/clubs",
  howItWorks: "/how-it-works",
  about: "/about",
  faq: "/faq",
  contact: "/contact",
  getStarted: "/get-started",
  privacy: "/privacy",
  login: "/login",
  dashboard: "/dashboard",
  jobsBoard: "/jobs",
} as const;

export const primaryNav = [
  { href: routes.home, label: "Home" },
  { href: routes.jobsBoard, label: "Jobs" },
  { href: routes.coaches, label: "For Coaches" },
  { href: routes.clubs, label: "For Clubs" },
  { href: routes.players, label: "For Players" },
  { href: routes.afterCollege, label: "Visa Pathways" },
  { href: routes.about, label: "About" },
] as const;

export const mobileNav = [
  { href: routes.jobsBoard, label: "Jobs" },
  { href: routes.coaches, label: "Coaches" },
  { href: routes.afterCollege, label: "Coaching after college (OPT)" },
  { href: routes.jobs, label: "Tennis coaching jobs, USA" },
  { href: routes.players, label: "Players" },
  { href: routes.clubs, label: "Clubs & academies" },
  { href: routes.howItWorks, label: "How it works" },
  { href: routes.about, label: "About" },
  { href: routes.faq, label: "FAQ" },
  { href: routes.contact, label: "Contact" },
] as const;
