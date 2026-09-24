import type { Pillar } from "@/lib/content/landings";

/** Verbatim public copy sourced from https://triviumsports.com (Sep 2026). Do not rewrite. */

export const legacyHome = {
  h1: "Coaching placements for student-athletes and coaches",
  lede: "We connect graduating athletes and qualified talent with vetted U.S. clubs and academies. Expect clear steps, visa support, and lasting mentorship.",
  clearPath: {
    h2: "A Clear Path Where There Was None",
    p1: "Every year, thousands of international student-athletes graduate from U.S. colleges with the training, mindset, and desire to stay involved in sport through coaching.",
    p2: "We remove the friction. We match you with quality programs, make visas understandable, and support you beyond day one so you can build a meaningful career in the U.S.",
  },
  mission: {
    h2: "More Than a Match. A Mission.",
    p1: "We operate with ethics, clarity, and full compliance.",
    p2: "Every placement follows documented standards, verified partners, and clear agreements. We work with immigration counsel, confirm employer obligations, and keep an auditable record from screening to start date.",
    p3: "People first, rules followed, outcomes measured.",
  },
  standards: [
    {
      title: "Selection Standards",
      body: "Each candidate is assessed against documented criteria using a standardized rubric, with scores and recorded outcomes ensuring traceability.",
    },
    {
      title: "Legal Readiness",
      body: "Immigration counsel validates the appropriate work authorization path and timing, and we confirm status and eligibility before any offer.",
    },
    {
      title: "Employer Compliance",
      body: "Partners commit to I-9 verification, wage compliance, and safeguarding policies, formalized in agreements and reviewed periodically for accountability.",
    },
  ],
  whoWeServe:
    "Tailored services for student-athletes, coaches, and employers, with role-specific guidance and clear next steps.",
  forStudentAthletes:
    "Turn high performance habits into coaching impact in the U.S. Get step by step OPT support, interview prep, curated introductions, and mentorship through your first season.",
  forCoaches:
    "Advance your coaching career with roles in youth and high-performance settings. We welcome former college players, licensed coaches, and growth-minded international candidates.",
  forClubs:
    "Hire disciplined, globally minded coaches who elevate your program and culture. We manage sourcing, structured screening, and counsel supported compliance support on clear timelines.",
  shoes: {
    kicker: "WHO WE ARE",
    h2: "We’ve Been in Your Shoes",
    body: "Trivium Sports was founded by three professionals with deep international experience in the sports industry. With strong roots in racquet sports and a shared commitment to coach development, we’ve seen the challenges firsthand and built a more thoughtful, supportive path forward.",
  },
  footerMission:
    "We unlock careers across borders. From daily reps to your first session as a mentor, we connect student-athletes and coaches with vetted roles and walk the legal path with you.",
} as const;

export const legacyCoaches = {
  kicker: "Your are ready to Coach. We are here to help you grow.",
  title: "Turn experience into a U.S. coaching career",
  lede: "You have real in-sport experience. We help international coaches and former student-athletes secure coaching placements with vetted U.S. clubs, academies, and schools across youth and high-performance environments. Build a long-term coaching career in the United States with compliant hiring, clear timelines, and support that continues after placement.",
  whatYouGetHeading: "What you get",
  whatYouGet: [
    "Vetted coaching jobs nationwide with curated introductions",
    "Work authorization and compliance guidance with counsel support",
    "Interview prep, resume polish, and role fit by sport and level",
    "Ongoing mentorship and performance check-ins",
  ],
  expectHeading: "What you can expect from us",
  expectP1:
    "We do not just match you with a job and disappear. We help international coaches build meaningful careers with purpose, stability, and support. If you want to stay in the U.S. but your visa timeline feels uncertain, if you struggle to find roles that fit your values and strengths, if applications go unanswered, if part-time work feels limiting, or if you are ready to grow without a clear next step, we can help.",
  expectP2: "We bring structure, legal clarity, and real opportunities to move you forward.",
  pillars: [
    {
      icon: "professionals",
      title: "Coaching opportunities that fit",
      body: "We connect you with clubs and programs that match your strengths, goals, and personality. Fit matters for you and for the organizations we work with.",
    },
    {
      icon: "compliance",
      title: "Legal and Visa guidance",
      body: "We walk you through employment eligibility and visa options like OPT, O1, and P1. We also work closely with immigration attorneys to support you and your future employer every step of the way.",
    },
    {
      icon: "pathway",
      title: "Ongoing mentorship",
      body: "Your coaching journey does not end at placement. We check in regularly to offer support, professional advice, and help as you grow in your role.",
    },
    {
      icon: "architecture",
      title: "A professional network that cares",
      body: "You will be part of a trusted community that values character, curiosity, and a shared commitment to sport. We take your development seriously.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Build your career your confidence",
  ctaLede: "Personalized matches, compliant hiring, and a network committed to your development.",
  lookingHeading: "Who we’re looking for",
  lookingP1:
    "We partner with coaches who see this as a calling, not just a job, and who want to make a real impact on players and programs. Our ideal candidates are international graduates eligible to work in the U.S., passionate about teaching and player development, professional, respectful, adaptable, and eager to grow.",
  lookingP2: "If this sounds like you, we would love to hear your story.",
} as const;

export const legacyClubs = {
  kicker: "FOR EMPLOYERS",
  title: "Reliable coaching talent. Global Perspective. Full-service support.",
  lede: "Each year, standout international graduates are ready to coach in the U.S. We deliver curated shortlists and handle compliance so your program can move fast.",
  expectHeading: "What you can expect from us",
  expectP1:
    "We reduce hiring risk with a transparent, auditable process that stays human. From day one we align role scope, culture, and timelines, then provide structure and legal clarity at every step.",
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
      title: "Coaches Ready to Work",
      body: "We manage the legal and logistical steps so you can focus on your program. Our team collaborates directly with the coach and experienced immigration attorneys to ensure everything is handled properly, with full compliance and minimal effort required from your side.",
    },
    {
      icon: "architecture",
      title: "Personalized matching",
      body: "We take the time to understand your environment, goals, and values. Every recommendation is made with long-term fit and success in mind.",
    },
    {
      icon: "pathway",
      title: "Continued support",
      body: "You will be part of a trusted community that values character, curiosity, and a shared commitment to sport. We take your development seriously.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Hire with confidence",
  ctaLede: "Share your role. We deliver a curated shortlist with eligibility confirmed and timelines aligned.",
  whoHeading: "Who we work with",
  whoBody:
    "We partner with clubs, training centers, schools, academies, and youth programs that invest in growth and strong culture. Year round or seasonal, we source reliable coaching talent that fits your standards and supports long term success.",
} as const;

export const legacyStudentAthletes = {
  kicker: "From Student-Athlete to Coach: Your Next Chapter Starts Here",
  title: "Own your next chapter",
  lede: "Years of elite training translate directly to value in the role. Your habits, judgment, and leadership are what strong programs seek.",
  youBringHeading: "You bring:",
  youBring: [
    "Team intelligence under pressure",
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
      body: "We support you and your future employer throughout the legal process, including OPT and longer-term options such as the O1 or P1 visa. We also work with experienced immigration attorneys to make sure everything is done correctly and compliantly.",
    },
    {
      icon: "pathway",
      title: "Mentorship and check-Ins",
      body: "Once you are placed, we stay in touch. We continue to offer guidance as you adjust to your role, develop as a coach, and plan your next steps.",
    },
  ] satisfies readonly Pillar[],
  ctaTitle: "Start with a plan",
  ctaLede: "We map eligibility, prep interviews, and match you with programs that fit.",
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
    "Trivium Sports is a coach-centered initiative that connects international student-athletes and early-career coaches with trusted U.S. sports organizations. We focus on character-driven placements, lawful hiring, and long-term mentorship so coaches grow and clubs build stronger, more consistent programs. Our work sits at the intersection of global talent, coaching development, and youth sport leadership.",
  whyHeading: "Why we started",
  whyBody:
    "Every year, thousands of international student-athletes graduate with the discipline and mindset to coach, yet few have a clear path. At the same time, clubs, academies, and schools struggle to hire dependable, well-prepared staff. Trivium Sports bridges that gap by simplifying the process, removing legal and logistical barriers, and aligning coaches and organizations for lasting success.",
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
      body: "Hands-on guidance through each step, including compliance, cultural adaptation, and employment requirements, so everything is handled correctly and responsibly.",
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
  foundersHeading: "Meet the founders",
  founders: [
    {
      name: "Juan Carlos Bàguena",
      role: "Global Talent Network and Scouting",
      body: "Tennis coach, former ATP player, and program director with 30 years in high-performance tennis. He has coached top-50 ATP and WTA players, led programs at international academies in Spain, and founded Barcelona Tennis Academy. He also created Top Tennis Careers, a placement and consulting platform for coaches worldwide.",
    },
    {
      name: "Miguel Coelho",
      role: "Learning and Coaching Development",
      body: "Tennis coach, educator, and program director with 25 years of experience in Portugal, Spain, and the United States, working with athletes from beginners to ATP, WTA, and ITF professionals. A strong advocate for coach development, he contributes to coach education with the USTA. He holds a master’s in High-Performance Tennis and a PhD from the University of Arizona.",
    },
    {
      name: "Patrick Szymczak",
      role: "Employer Partnerships and Placement",
      body: "Former international student-athlete who came to the United States on a tennis scholarship. After earning both bachelor’s and master’s degrees, he coached at the Division I level and later founded an academy serving athletes across the Phoenix Valley. Having navigated immigration and career-building firsthand, he brings practical insight into how international coaches build careers in the United States.",
    },
  ],
  ctaTitle: "Ready to connect",
  ctaLede:
    "We build programs and careers that last through compliant hiring, curated matches, and mentorship that continues beyond day one.",
} as const;

export const legacyHowItWorks = {
  title: "Clear steps. Real support. Long-term impact.",
  lede: "Whether you are an international student-athlete looking to begin a coaching career in the U.S. or a sports organization searching for reliable, high-character talent, we are here to guide you every step of the way.",
  p2: "We simplify the process for both sides by aligning values, managing logistics, and ensuring all placements are legal, compliant, and built on mutual trust.",
  coachSteps: [
    {
      t: "1. Apply or reach out",
      d: "Share your background, sport, location preferences, and timeline. We serve multiple sports across U.S. clubs, academies, and schools.",
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
      d: "We coordinate work authorization and confirm employer obligations for a compliant, low-effort process.",
    },
    {
      t: "4. Onboard and retain",
      d: "Align expectations, support integration, and track early milestones for stronger retention..",
    },
  ],
  differentHeading: "What makes our process different",
  different: [
    { title: "Clear guidance", body: "We walk you through every step with transparency and care." },
    { title: "Full compliance", body: "We follow a legal, ethical process focused on long-term success." },
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
    a: "Trivium Sports connects international student-athletes and early-career coaches with trusted sports organizations in the U.S. We offer career placement, visa support, and long-term coaching development opportunities.",
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
    a: "Yes, most international students are eligible for Optional Practical Training (OPT) after graduation. This temporary work authorization allows you to gain coaching experience in your field of study for up to 12 months.",
  },
  {
    q: "What happens after my OPT ends?",
    a: "We support you and your future employer in exploring longer-term options such as the O1 or P1 visas, which allow international professionals to continue working in the U.S. We work closely with immigration attorneys to guide this process.",
  },
  {
    q: "Can I choose where I want to live or work?",
    a: "We consider your location preferences when matching you with clubs, but flexibility increases your chances of finding a good fit. We aim for placements where both sides can grow.",
  },
  {
    q: "What kind of support will I receive after placement?",
    a: "We offer ongoing mentorship, check-ins, and legal support. Our goal is to help you succeed not just in getting hired, but in developing your career and adapting to your new environment.",
  },
] as const;

export const legacyOptFaqs = [
  {
    q: "What is OPT and how does it work?",
    a: "OPT stands for Optional Practical Training. It is a 12-month work authorization available to international students on F-1 visas after completing their degree. It allows recent graduates to work in a field related to their studies. Coaching often qualifies. We guide you through every step.",
  },
  {
    q: "What is the O1 visa?",
    a: "The O1 visa is for individuals with “extraordinary ability” in fields such as athletics, arts, or education. It can be a longer-term option for coaches after OPT, especially those with collegiate playing experience, awards, or significant contributions in sport.",
  },
  {
    q: "What is the P1 visa?",
    a: "The P1 visa is designed for internationally recognized athletes and coaches. It is sometimes used in team sports and high-level coaching environments. We assess each case and work with immigration attorneys to determine the best path forward.",
  },
  {
    q: "Do you provide legal services directly?",
    a: "No. We are not a law firm. However, we collaborate closely with licensed immigration attorneys who advise and support both coaches and employers throughout the placement process.",
  },
] as const;

export const legacyClubFaqs = [
  {
    q: "Do I have to sponsor a visa?",
    a: "We work closely with each coach to ensure they are legally authorized to work in the U.S. Our team, along with trusted immigration attorneys, manages the necessary steps to keep the process smooth and compliant for your organization. You will receive clear guidance and minimal paperwork.",
  },
  {
    q: "What is the time frame for hiring a coach?",
    a: "Depending on your needs and the coach’s eligibility, placement can take anywhere from a few weeks to a couple of months. Starting early allows us to coordinate the legal and onboarding steps more efficiently.",
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
