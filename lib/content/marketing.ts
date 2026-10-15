export const faqGroups = [
  {
    title: "Coaches",
    items: [
      {
        q: "Do I need to be in the United States already?",
        a: "The coaches page is written for international coaches already in the U.S., typically on OPT or STEM OPT. If you are abroad, use Contact and we will tell you honestly whether a conversation makes sense.",
      },
      {
        q: "Is this a job board I can apply to by clicking a listing?",
        a: "No. Open roles are not listed publicly right now. Tell us about your tennis background and we introduce you to directors. This is not a job board.",
      },
      {
        q: "Will you tell me if I qualify for OPT or STEM OPT?",
        a: "No. We work with immigration counsel. Your DSO decides whether you qualify for OPT or STEM OPT. We can discuss tennis work inside an authorization you already have.",
      },
      {
        q: "Where do coaches placed by Trivium work?",
        a: "Coaches placed by Trivium work at U.S. clubs and academies. You are on their courts, in their programs, to their tennis standard.",
      },
    ],
  },
  {
    title: "Players",
    items: [
      {
        q: "Can you place me at a U.S. academy?",
        a: "We help with academy placement, training blocks, and competition planning for international players. It starts with a player intake so we understand level and dates.",
      },
      {
        q: "Do you work with juniors?",
        a: "This website’s self-serve intakes are for adults 18 and older. Families should use the contact form.",
      },
      {
        q: "Do you guarantee ranking points or college recruiting outcomes?",
        a: "No. We plan training and competition honestly. Tennis results remain on the court.",
      },
    ],
  },
  {
    title: "Clubs",
    items: [
      {
        q: "Who directs the tennis if a coach placed by Trivium is on our courts?",
        a: "You do. Coaches placed by Trivium work at clubs. Directors keep the program, the culture, and the on-court standard.",
      },
      {
        q: "What if a placement raises an immigration question?",
        a: "We work with immigration counsel. Directors keep the tennis program, the culture, and the on-court standard.",
      },
      {
        q: "Can we post a public job on your site?",
        a: "Not as a self-serve board. Speak with us through the club intake and we will treat it as a tennis search.",
      },
    ],
  },
] as const;

export const optFaqs = [
  {
    q: "What is OPT for a college tennis player?",
    a: "Optional Practical Training is a form of work authorization available to many F-1 students after a qualifying U.S. degree. Some former college tennis players use an OPT window to coach at U.S. clubs if the role and their DSO’s guidance align. It is not a tennis visa and it is not guaranteed.",
  },
  {
    q: "What is STEM OPT in this context?",
    a: "STEM OPT is an extension available only for specific degree categories on the official STEM list, with additional conditions. It is not available to every tennis player who competed in college.",
  },
  {
    q: "Does Trivium Sports provide immigration legal advice?",
    a: "No. Trivium Sports is not a law firm and does not provide immigration advice. We work with immigration counsel. Your Designated School Official decides OPT and STEM OPT eligibility. We help with the tennis transition and club introductions.",
  },
] as const;

export const jobRoles = [
  {
    title: "Club professional",
    body: "The daily engine of a U.S. tennis club: group clinics, private lessons, junior pathway, adult 3.0–4.5 programming, and a presence members recognize.",
  },
  {
    title: "High-performance coach",
    body: "Academy blocks, tournament players, and higher-intensity sessions. Still tennis-club work — not a tour truck — with a standard that serious juniors can feel.",
  },
  {
    title: "Junior development",
    body: "10-and-under through high-school duals. Patience, progressions, and the ability to speak with parents without losing the lesson.",
  },
  {
    title: "Director-adjacent support",
    body: "Experienced coaches who can own a court block, mentor younger staff, and keep a Saturday morning looking like a professional club.",
  },
] as const;

export const howItWorksAudiences = [
  {
    id: "coaches",
    title: "Coaches",
    steps: [
      "Complete the coach intake (OPT / STEM OPT, résumé, where you can live).",
      "We review tennis level, teaching range, and timing.",
      "We introduce you to clubs whose calendars match.",
      "You step onto court as a coach placed by Trivium at that club.",
    ],
  },
  {
    id: "players",
    title: "Players",
    steps: [
      "Tell us your level, dates, and whether you want training, academy, or competition.",
      "We shortlist U.S. environments that fit tennis and logistics.",
      "You confirm a plan — a training block, placement, or calendar.",
      "We remain the professional contact while you are in the country.",
    ],
  },
  {
    id: "clubs",
    title: "Clubs & academies",
    steps: [
      "Share the courts you need covered and the tennis standard you expect.",
      "We source coaches whose habits match your club.",
      "When a placement raises an immigration question, we work with immigration counsel.",
      "Coaches placed by Trivium work at your club; you direct the tennis.",
    ],
  },
] as const;
