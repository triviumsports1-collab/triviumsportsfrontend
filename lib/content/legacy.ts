import type { Pillar } from "@/lib/content/landings";

/** Public marketing copy. Pre-launch punch list (Oct 2026) overrides earlier verbatim legacy text. */

export const legacyHome = {
  h1: "Coaching placements for student-athletes and coaches",
  lede: "We connect graduating tennis players and qualified coaches with U.S. clubs and academies. Expect clear steps and lasting mentorship.",
  clearPath: {
    h2: "A Clear Path Where There Was None",
    p1: "Every year, thousands of international student-athletes graduate from U.S. colleges with the training, mindset, and desire to stay involved in sport through coaching.",
    p2: "We remove the friction. We match you with quality tennis programs and support you beyond day one so you can build a meaningful coaching chapter in the U.S.",
  },
  mission: {
    h2: "More Than a Match. A Mission.",
    p1: "We operate with ethics and a clear process.",
    p2: "Every placement follows documented standards and verified tennis partners. We work with immigration counsel. We do not decide whether someone qualifies to work.",
    p3: "People first, rules followed, outcomes measured.",
  },
  standards: [
    {
      title: "Selection Standards",
      body: "Each candidate is assessed against documented criteria using a standardized rubric, with scores and recorded outcomes ensuring traceability.",
    },
    {
      title: "Counsel on timing",
      body: "We work with immigration counsel on timing. We do not decide eligibility, and we do not file petitions.",
    },
  ],
  whoWeServe:
    "Tailored services for student-athletes, coaches, and employers, with role-specific guidance and clear next steps.",
  forStudentAthletes:
    "Turn college tennis habits into a coaching chapter in the U.S. We explain OPT and STEM OPT in plain language, prepare you for club conversations, and stay in touch through the first season.",
  forCoaches:
    "Advance a tennis coaching career at U.S. clubs while you are already in the United States, including on OPT or STEM OPT.",
  forClubs:
    "Hire disciplined, globally minded tennis coaches who elevate your program and culture. We manage sourcing and structured screening, with counsel-supported compliance, on clear timelines.",
  shoes: {
    kicker: "WHO WE ARE",
    h2: "We’ve Been in Your Shoes",
    body: "Trivium Sports was founded by people with deep experience in tennis. With roots in the college game, club coaching, and coach development, we’ve seen the challenges firsthand and built a more thoughtful, supportive path forward.",
  },
  footerMission:
    "We unlock tennis careers across borders. From daily reps to a first session as a mentor, we connect student-athletes and coaches with U.S. clubs. We work with immigration counsel.",
} as const;

export const legacyCoaches = {
  kicker: "You are ready to coach. We are here to help you grow.",
  title: "Tennis coaching in the U.S., for coaches already here.",
  lede: "This page is for international tennis coaches already in the United States, usually on OPT or STEM OPT. If you can run clinics, private lessons, and junior development, we introduce you to clubs and academies whose calendars match how you teach.",
  whatYouGetHeading: "What you get",
  whatYouGet: [
    "Introductions to U.S. tennis clubs and academies",
    "A plain-language conversation about the OPT or STEM OPT window you already have",
    "Interview preparation and a tennis résumé directors can read",
    "Mentorship and check-ins after you are on court",
  ],
  expectHeading: "What you can expect from us",
  expectP1:
    "We do not match you with a club and disappear. If you are already in the United States, your OPT or STEM OPT timeline feels tight, club applications go unanswered, or you want a full tennis day instead of leftover hours, we can help you have a serious conversation with the right director.",
  expectP2: "We bring structure and real tennis opportunities so you can move forward. We work with immigration counsel. We do not decide whether you qualify.",
  pillars: [
    {
      icon: "professionals",
      title: "Tennis roles that fit",
      body: "We introduce you to clubs and academies that match how you teach: juniors, adults, clinics, and private lessons. Fit matters for you and for the program.",
    },
    {
      icon: "compliance",
      title: "OPT and STEM OPT, in tennis terms",
      body: "We talk through the authorization window you already have or are arranging with your DSO. We work with immigration counsel. We do not tell you whether you qualify, and we do not file petitions.",
    },
    {
      icon: "pathway",
      title: "Mentorship and check-ins",
      body: "Placement is the start. We check in as you learn the club calendar, the members, and the standard the director expects.",
    },
    {
      icon: "architecture",
      title: "A tennis network that stays",
      body: "You join coaches who care about player development and professional habits. We take your development seriously.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Build your career and your confidence",
  ctaLede: "Tennis introductions, a clear timeline, and a network committed to your development on court.",
  lookingHeading: "Who we’re looking for",
  lookingP1:
    "We partner with tennis coaches already in the United States who treat teaching as a craft. Ideal candidates are eligible to work, often on OPT or STEM OPT, serious about player development, and ready for early courts and weekend clinics.",
  lookingP2: "If you are still abroad, write to us and we will tell you honestly whether a conversation makes sense. If this sounds like you, we would like to hear your tennis story.",
} as const;

export const legacyClubs = {
  kicker: "FOR EMPLOYERS",
  title: "Reliable tennis coaching talent, a global perspective, and full-service support.",
  lede: "Each year, standout international tennis graduates are ready to coach in the U.S. We deliver curated shortlists so your program can move on a clear timeline.",
  expectHeading: "What you can expect from us",
  expectP1:
    "We reduce hiring risk with a transparent process that stays human. From day one we align role scope, culture, and timelines. When a placement raises an immigration question, we work with immigration counsel.",
  expectP2:
    "You receive structured interview notes and reference summaries, regular updates through a single point of contact, and shortlists you can evaluate with confidence.",
  expectP3:
    "After the offer we remain involved to support onboarding, communication, and long term success.",
  pillars: [
    {
      icon: "professionals",
      title: "Pre-vetted candidates",
      body: "We connect you with coaches who have been carefully screened and are ready to thrive in the work environment you offer.",
    },
    {
      icon: "compliance",
      title: "Coaches ready to work",
      body: "We coordinate the practical steps of a tennis placement so you can focus on your program. When immigration questions come up, we work with immigration counsel.",
    },
    {
      icon: "architecture",
      title: "Personalized matching",
      body: "We take the time to understand your environment, goals, and values. Every recommendation is made with long-term fit and success in mind.",
    },
    {
      icon: "pathway",
      title: "Continued support",
      body: "After a coach starts, directors get retention check-ins and a single point of contact. We stay involved so the placement can last.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Hire with confidence",
  ctaLede: "Share your role. We deliver a curated shortlist and a clear timeline.",
  whoHeading: "Who we work with",
  whoBody:
    "We partner with U.S. tennis clubs, academies, and training centers that invest in growth and a strong on-court culture. Year-round or seasonal, we source tennis coaches who fit your standard.",
} as const;

export const legacyStudentAthletes = {
  kicker: "From Student-Athlete to Coach: Your Next Chapter Starts Here",
  title: "Own your next chapter",
  lede: "Years of elite training translate directly to value in the role. Your habits, judgment, and leadership are what strong programs seek.",
  youBringHeading: "You bring:",
  youBring: [
    "A weekly training load you can sustain",
    "Leadership by example",
    "Clear communication and discipline",
    "Global perspective that strengthens culture",
  ],
  advantage: "Your background is an advantage.",
  expectHeading: "What you can expect from us",
  expect:
    "We work closely with international student-athletes who are serious about exploring coaching in the U.S. Whether you’re planning a short-term experience through OPT or building a long-term career, we are here to support you every step of the way.",
  pillars: [
    {
      icon: "architecture",
      title: "Personalized support",
      body: "We help you understand your options based on your background, timeline, and goals.",
    },
    {
      icon: "professionals",
      title: "Access to trusted opportunities",
      body: "We partner with sports clubs, academies, and youth programs that are open to hiring international talent and committed to your growth.",
    },
    {
      icon: "compliance",
      title: "Visa and OPT guidance",
      body: "We explain OPT in tennis terms and point status questions to your DSO. We work with immigration counsel. We do not decide whether you qualify.",
    },
    {
      icon: "pathway",
      title: "Mentorship and check-ins",
      body: "Once you are placed, we stay in touch. We continue to offer guidance as you adjust to your role, develop as a coach, and plan your next steps.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Start with a plan",
  ctaLede: "Tell us your tennis goals. We prepare the conversation and introduce you when the fit is real.",
  lookHeading: "What We Look For",
  lookP1:
    "You don’t need coaching experience to get started. We’re looking for international student-athletes who are ready to learn, grow, and make a difference.",
  lookH3: "You may be a good fit if you are:",
  lookItems: [
    "Graduating from a U.S. college as an international student-athlete",
    "Curious about coaching and open to exploring a new path",
    "Respectful, responsible, and eager to help others improve",
    "Committed to learning and doing things the right way",
  ],
  lookClose: "If this sounds like you, we encourage you to share your goals. We’ll guide you through the rest.",
} as const;

export const legacyAbout = {
  title: "Built by coaches. Powered by purpose.",
  whoHeading: "Who we are",
  whoBody:
    "Trivium Sports introduces international student-athletes and early-career tennis coaches to U.S. clubs and academies. We focus on character, a clear process, and mentorship so coaches grow and clubs keep a consistent on-court standard.",
  whyHeading: "Why we started",
  whyBody:
    "Every year, thousands of international student-athletes graduate with the discipline and mindset to coach, yet few have a clear path into U.S. tennis clubs. Academies still need dependable, well-prepared staff. Trivium Sports makes that introduction and stays available after the coach is on the schedule.",
  approachHeading: "Our approach",
  approachLede:
    "We are not a shortcut. We are a long-term partner for organizations that value development, integrity, and doing things the right way.",
  approach: [
    {
      title: "Trust",
      body: "We work only with coaches and employers committed to professionalism, mutual respect, and ethical practice.",
    },
    {
      title: "Support",
      body: "Hands-on guidance through each step, including cultural adaptation and a clear timeline, so the introduction is handled responsibly.",
    },
    {
      title: "Character",
      body: "We prioritize people who lead with integrity, communicate with care, and bring adaptability and purpose to their roles.",
    },
    {
      title: "Clarity",
      body: "Transparent standards and timelines. No hidden steps, no false promises. Clear expectations and lawful processes from first call to start date.",
    },
  ],
  specialistsKicker: "DISCOVER THE SPECIALISTS",
  foundersHeading: "Meet the founder",
  founders: [
    {
      name: "Patrick Szymczak",
      role: "Employer Partnerships and Placement",
      body: "Former international student-athlete who came to the United States on a tennis scholarship. After earning both bachelor’s and master’s degrees, he coached at the Division I level and later founded an academy serving athletes across the Phoenix Valley. Having navigated immigration and career-building firsthand, he brings practical insight into how international coaches build careers in the United States.",
    },
  ],
  advisoryHeading: "Advisory Board",
  advisors: [
    {
      name: "Juan Carlos Baguena",
      role: "Advisor, Global Talent Network and Scouting",
      body: "Tennis coach, former ATP player, and program director with 30 years in high-performance tennis. He has coached top-50 ATP and WTA players, led programs at international academies in Spain, and founded Barcelona Tennis Academy. He also created Top Tennis Careers, a placement and consulting platform for coaches worldwide.",
    },
    {
      name: "Miguel Coelho",
      role: "Advisor, Learning and Coaching Development",
      body: "Tennis coach, educator, and program director with 25 years of experience in Portugal, Spain, and the United States, working with athletes from beginners to ATP, WTA, and ITF professionals. A strong advocate for coach development, he contributes to coach education with the USTA. He holds a master’s in High-Performance Tennis and a PhD from the University of Arizona.",
    },
  ],
  ctaTitle: "Ready to connect",
  ctaLede:
    "We build programs and careers that last through careful introductions, curated matches, and mentorship that continues beyond day one.",
} as const;

export const legacyHowItWorks = {
  title: "Clear steps. Real support. Long-term impact.",
  lede: "Whether you are an international student-athlete looking to begin a coaching career in the U.S. or a sports organization searching for reliable, high-character talent, we are here to guide you every step of the way.",
  p2: "We simplify the process for both sides by aligning values, managing logistics, and ensuring all placements are legal, compliant, and built on mutual trust.",
  coachSteps: [
    {
      t: "1. Apply or reach out",
      d: "Share your tennis background, where you can live, and your timeline. We work with U.S. clubs and academies.",
    },
    {
      t: "2. Intro call and plan",
      d: "Clarify goals and eligibility, align on options and timing, and set a simple action plan.",
    },
    {
      t: "3. Match, interview, confirm",
      d: "Receive curated introductions, complete structured interviews, and finalize the offer with clear expectations.",
    },
    {
      t: "4. Start and grow",
      d: "Begin with onboarding support, regular check-ins, and mentorship for a strong first season.",
    },
  ],
  clubSteps: [
    {
      t: "1. Submit a role",
      d: "Define scope, schedule, compensation, culture, and success markers.",
    },
    {
      t: "2. Curated shortlist",
      d: "Review pre-screened candidates with structured notes and reference summaries.",
    },
    {
      t: "3. Eligibility and paperwork",
      d: "When a placement needs it, we work with immigration counsel and keep the club timeline clear.",
    },
    {
      t: "4. Onboard and retain",
      d: "Align expectations, support integration, and track early milestones for stronger retention.",
    },
  ],
  differentHeading: "What makes our process different",
  different: [
    { title: "Clear guidance", body: "We walk you through every step with transparency and care." },
    { title: "A careful process", body: "We follow an ethical process focused on long-term tennis relationships. We work with immigration counsel." },
    { title: "Thoughtful matching", body: "We ensure strong alignment before any introductions are made." },
    {
      title: "Future-oriented support",
      body: "We help you plan beyond the first day, setting you up for continued growth.",
    },
  ],
} as const;

/** Tennis-relevant FAQs copied verbatim. Multi-sport expansion answers are omitted (PRD tennis vertical). */
export const legacyCoachFaqs = [
  {
    q: "What is Trivium Sports?",
    a: "Trivium Sports introduces international student-athletes and early-career tennis coaches to U.S. clubs and academies. We help with the tennis transition and stay involved after a coach is on court. We work with immigration counsel.",
  },
  {
    q: "Can I apply before I graduate?",
    a: "Yes. We encourage student-athletes to start the conversation during their final semester of college. This allows us to plan ahead and explore pathways like OPT before graduation.",
  },
  {
    q: "Do I need coaching experience to apply?",
    a: "No. We work with both experienced coaches and student-athletes who are just starting out. What matters most is your character, your willingness to learn, and your passion for working with athletes.",
  },
  {
    q: "Can I work in the U.S. after I graduate?",
    a: "Many international students can apply for Optional Practical Training (OPT) after graduation. Whether coaching fits depends on your degree field and your DSO. It is not automatic, and it is not a tennis visa.",
  },
  {
    q: "What happens after my OPT ends?",
    a: "Any longer stay depends on your own case. We work with immigration counsel. We do not recommend a visa category on this website.",
  },
  {
    q: "Can I choose where I want to live or work?",
    a: "We consider your location preferences when matching you with clubs, but flexibility increases your chances of finding a good fit. We aim for placements where both sides can grow.",
  },
  {
    q: "What kind of support will I receive after placement?",
    a: "We offer ongoing mentorship and check-ins. The goal is to help you settle into the club and keep developing as a tennis coach.",
  },
] as const;

export const legacyOptFaqs = [
  {
    q: "What is OPT and how does it work?",
    a: "OPT stands for Optional Practical Training. It is work authorization available to many F-1 students after a qualifying U.S. degree, in a field related to their studies. Coaching qualifies only when the degree field and your DSO’s guidance align. We work with immigration counsel and do not decide eligibility.",
  },
  {
    q: "Do you provide legal services directly?",
    a: "No. We are not a law firm and do not provide immigration advice. We work with immigration counsel. Your DSO remains the authority on student status.",
  },
] as const;

export const legacyClubFaqs = [
  {
    q: "What is the time frame for hiring a coach?",
    a: "Depending on your needs and the coach’s situation, placement can take anywhere from a few weeks to a couple of months. Starting early gives everyone a clearer calendar.",
  },
  {
    q: "Is there a minimum contract length or commitment?",
    a: "We recommend placements of at least 6 to 12 months to ensure continuity and impact, but we can discuss seasonal and short-term options on a case-by-case basis.",
  },
  {
    q: "Do you offer support after the hire?",
    a: "Yes. We stay in contact with both coach and employer after placement to help with integration, communication, and retention. We are here to make sure it works for both sides.",
  },
  {
    q: "How much does it cost to work with Trivium?",
    a: "Our pricing model is designed to be fair, transparent, and aligned with the level of support you receive. Please reach out to discuss your hiring needs and we will provide a clear proposal.",
  },
  {
    q: "How do I start the process?",
    a: "Fill out our short coaching request form or reach out through our contact page. We will schedule a call, learn more about your program, and recommend next steps.",
  },
] as const;
