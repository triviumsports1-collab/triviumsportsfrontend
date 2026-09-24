export const trustPills = [
  "Tennis only",
  "U.S. clubs & academies",
  "Adults 18+",
  "Not a law firm",
] as const;

export const visaDisclaimer =
  "Trivium Sports is not a law firm and does not provide immigration advice. Status questions belong with your Designated School Official and licensed counsel. We coordinate tennis work with clubs so the on-court chapter is structured and transparent.";

export type PillarIcon = "architecture" | "professionals" | "compliance" | "pathway";

export type Pillar = {
  icon: PillarIcon;
  title: string;
  body: string;
};

export const coachLanding = {
  kicker: "For coaches",
  title: "Club-ready tennis coaches already in the United States.",
  lede: "If you are on OPT or STEM OPT and can run a full tennis day — clinics, privates, junior development — Trivium is the professional introduction to U.S. clubs and academies.",
  pillarHeading: "Built for elite tennis professionals",
  pillarLede:
    "We introduce coaches who already speak the college game, the club calendar, and a high-performance standard — not generalist staff looking for a seasonal court.",
  pillars: [
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "Specialized coaching pedigree, tournament-level habits, and player development that directors can put in front of members without lowering the room.",
    },
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "Clinics, elite privates, and junior-to-pro progressions — the full tennis day, not a single hitting block advertised as a career.",
    },
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "OPT and STEM OPT timing treated as a professional process. We coordinate work authorization with clubs and the advisors on your case — we do not file petitions.",
    },
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "You land inside a club’s curriculum, culture, and multi-location calendar. Directors keep the tennis standard; you execute it on court.",
    },
  ],
  audience: [
    {
      kicker: "OPT",
      title: "Optional Practical Training",
      body: "You finished (or are finishing) a U.S. degree and want the next chapter to be tennis coaching — not a holding pattern.",
    },
    {
      kicker: "STEM OPT",
      title: "A longer training window",
      body: "You have additional time and want a club that can use a high-performance or academy professional with a longer horizon.",
    },
    {
      kicker: "On court",
      title: "Club-ready habits",
      body: "Directors need people who can run a 4.0 clinic, a 10-and-under court, and a serious private without losing the room.",
    },
  ],
  steps: [
    {
      n: "01",
      t: "Intake",
      d: "Résumé, certifications, status at a high level, and where you can live. Tennis first — not a generic career form.",
    },
    {
      n: "02",
      t: "Club conversations",
      d: "We introduce you to tennis directors whose calendar matches how you actually coach.",
    },
    {
      n: "03",
      t: "On-court chapter",
      d: "Trivium coaches work at clubs. We stay involved so the placement is professional, not informal.",
    },
  ],
  proof: [
    {
      title: "What we look for",
      items: [
        "A clean tennis story: where you trained, how you teach, and when you can be on court.",
        "Range: juniors, adults, and the ability to hold a private lesson standard.",
        "Reliability on early courts and weekend clinics — the real club calendar.",
      ],
    },
    {
      title: "What we will not do",
      items: [
        "Promise a visa outcome or tell you which category you “should” use.",
        "Drop you into a scraped job board of expired ads.",
        "Ask you to explain a kick serve in a spreadsheet to people who do not play.",
      ],
    },
  ],
} as const;

export const clubLanding = {
  kicker: "For clubs & academies",
  title: "Trivium coaches work at clubs. You keep the tennis standard.",
  lede: "We source international and post-collegiate tennis coaches for U.S. clubs and academies, then coordinate work authorization so directors can put professionals on court with a clear, compliant structure.",
  pillarHeading: "What U.S. clubs actually retain — and what we add",
  pillarLede:
    "Four professional pillars. Your tennis standard stays in-house. Trivium supplies elite professionals and a structured path from introduction to on-court presence.",
  pillars: [
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "Elite curriculum design, high-performance culture, and multi-location calendar synchronization stay with your directors. Trivium coaches work inside that architecture — they do not replace it.",
    },
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "Specialized coaching pedigree, tournament-level expertise, and player development — not generalist “sports staff” covering a court between other duties.",
    },
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "International coaches already in the United States, with work-authorization coordination and verified credentialing handled as a professional process. We are not a law firm.",
    },
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "Structured clinics, elite private training, and a junior-to-pro competitive pathway your members can feel on a Saturday morning.",
    },
  ],
  needs: [
    {
      title: "Elite professionals on your courts",
      body: "Club professionals and high-performance coaches who can run clinics and private lessons — not generalist sports staff.",
    },
    {
      title: "Global talent, structured compliance",
      body: "Timing, documentation, and a professional process so your club is not improvising work-authorization questions in a group chat.",
    },
    {
      title: "Program architecture stays yours",
      body: "You set curriculum, culture, and calendar. Trivium coaches work at your club, inside that standard.",
    },
  ],
  split: {
    keep: [
      "Program design, lesson rates you publish, and member experience.",
      "Who belongs on which court, and the standard they must meet.",
      "Your brand on court — members meet a coach who looks like your club.",
    ],
    we: [
      "A tennis-only search for coaches already in the U.S. or finishing college tennis.",
      "Structured work-authorization coordination with the right advisors.",
      "A professional point of contact after the coach is on your schedule.",
    ],
  },
} as const;

export const playerLanding = {
  kicker: "For players",
  title: "U.S. tennis with a plan — not a tourist week.",
  lede: "For international players who want serious training in the United States: the right academy environment, a competition calendar that makes sense, and a professional point of contact.",
  pillarHeading: "A high-performance stay, not a tourist week",
  pillarLede:
    "Training, competition, and living logistics planned as one pathway — with elite professionals and a club that already knows how to host international adults.",
  pillars: [
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "Structured academy blocks, elite private training, and a junior-to-pro competitive calendar coordinated with recovery — not a brochure of every tournament in the region.",
    },
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "You train with coaches who hold a tournament-level standard: patterns, physical work, and player development you can feel in a week, not a slogan.",
    },
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "The right academy environment: curriculum, language, and a weekly load that matches your level — including how the club sequences courts across a season.",
    },
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "Adults 18+ only on this intake. We are a professional point of contact for an international stay — not a law firm, and not a guarantee of ranking outcomes.",
    },
  ],
  help: [
    {
      title: "U.S. training",
      body: "Structured blocks at clubs and academies that actually develop tennis — hitting, patterns, and physical work — rather than an unstructured camp.",
    },
    {
      title: "Academy placement",
      body: "Matching level, language, and living situation to a U.S. academy or high-performance environment that can host you properly.",
    },
    {
      title: "Competition planning",
      body: "USTA, ITF, and sectional calendars coordinated with training, not stacked as a random list of tournaments.",
    },
  ],
  compare: [
    {
      title: "Training block",
      body: "A defined number of weeks on court with a clear weekly load. Best when you already know the environment you want.",
    },
    {
      title: "Academy season",
      body: "Longer placement: coaches, hitting, fitness, and a living plan. Best when you need a tennis home, not a visit.",
    },
    {
      title: "Competition calendar",
      body: "Events chosen against your ranking goals and recovery — not a brochure of every tournament in the region.",
    },
  ],
} as const;

export const afterCollegeLanding = {
  kicker: "Coaching after college",
  title: "OPT and STEM OPT, explained for tennis players.",
  lede: "Eligibility ends. The dual-match language you spent four years learning does not. Trivium helps former college players understand how Optional Practical Training can support a coaching chapter at U.S. clubs — and then makes the introduction.",
  pillarHeading: "From the last dual match to a coaching chapter",
  pillarLede:
    "College tennis is a language U.S. clubs understand. We help you translate it into elite professional work — with educational clarity on OPT and STEM OPT, never legal advice.",
  pillars: [
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "Optional Practical Training and STEM OPT explained in tennis terms. Your DSO and licensed counsel remain the authorities; we coordinate the club introduction around the window you actually have.",
    },
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "Directors do not need another highlight reel. They need tournament-level habits, player development, and someone who can hold a 7 a.m. clinic standard.",
    },
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "College seasons and club calendars do not automatically match. We time your on-court availability to a program’s curriculum and multi-week calendar.",
    },
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "A coaching chapter inside structured clinics, elite privates, and junior development — not a one-week trial advertised as a career.",
    },
  ],
  help: [
    {
      t: "Translate the college game",
      d: "Directors do not need another highlight reel of match wins. They need to know you can run a clinic, hold a standard, and show up for the 7 a.m. court.",
    },
    {
      t: "Time the calendar",
      d: "College seasons and club calendars do not automatically match. We talk about when you can actually be on court.",
    },
    {
      t: "Introduce you to tennis homes",
      d: "U.S. clubs and academies that want dedicated coaches — not a one-week trial advertised as a career.",
    },
  ],
} as const;

export const aboutLanding = {
  kicker: "About Trivium Sports",
  title: "Founded on court. Measured by how we place people.",
  lede: "Trivium Sports is a tennis-exclusive agency. The founding team comes from collegiate competition, club coaching, and the unglamorous work of placing people inside U.S. tennis buildings the right way.",
  pillarHeading: "How we measure the work",
  pillarLede:
    "Tennis-exclusive. Collegiate DNA. Club-ready professionals. Work authorization treated as process, not slogans.",
  highlightPillars: [
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "We exist for structured tennis: clinics, elite privates, and junior-to-pro environments inside U.S. clubs and academies — no other sport.",
    },
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "The founding team competed in and around the U.S. college system and taught on real courts. We know the difference between a résumé and a Saturday morning that works.",
    },
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "Directors keep curriculum, culture, and calendar. Trivium places professionals inside that architecture so members meet the club’s standard, not a generic agency brand.",
    },
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "OPT, STEM OPT, and related authorizations are part of how many tennis people stay on U.S. courts. We coordinate that reality with care. We are not a law firm.",
    },
  ],
  pillars: [
    {
      title: "Collegiate tennis",
      body: "The founding team competed in and around the U.S. college system — duals, travel, and the particular discipline of a season.",
    },
    {
      title: "Club coaching",
      body: "We have taught on public parks and high-performance courts. We know the difference between a résumé and a Saturday morning that works.",
    },
    {
      title: "International pathways",
      body: "OPT, STEM OPT, and related authorizations are part of how many tennis people stay on U.S. courts. We treat that reality with care, not slogans.",
    },
  ],
  standards: [
    "We do not provide legal advice. Immigration outcomes belong with DSOs and licensed counsel.",
    "Sensitive immigration and form data are collected only as needed, stored with access control, and never used as marketing content.",
    "Work authorization is coordinated as a professional process with clubs — not as an informal side conversation.",
    "Trivium coaches work at clubs under a clear arrangement. We do not improvise status on the back of a lesson pad.",
  ],
} as const;

export const jobsLanding = {
  kicker: "Tennis coaching jobs, USA",
  title: "The roles U.S. clubs actually need filled.",
  lede: "Role types first — club professional, high-performance, junior development — then a considered introduction. Open listings, when published, appear in HTML on this page and on the live board.",
  pillarHeading: "The tennis work U.S. clubs need filled",
  pillarLede:
    "Role types first — then a considered introduction. Every listing, when published, still maps to these four professional pillars.",
  pillars: [
    {
      icon: "professionals",
      title: "Elite Tennis Professionals",
      body: "Club professionals with specialized pedigree: group clinics, privates, and a presence members recognize — not a scraped ad for expired generalist work.",
    },
    {
      icon: "pathway",
      title: "High-Performance Pathway",
      body: "Academy blocks, tournament players, junior development from 10-and-under through high-school duals, and a junior-to-pro competitive standard.",
    },
    {
      icon: "architecture",
      title: "Leadership & Program Architecture",
      body: "Director-adjacent support: own a court block, mentor younger staff, and keep a multi-court Saturday looking like a professional club.",
    },
    {
      icon: "compliance",
      title: "Global Talent & Compliance",
      body: "U.S. courts you can actually reach, with work-authorization stance stated plainly on each published listing. No invented salaries. No visa promises.",
    },
  ],
} as const;
