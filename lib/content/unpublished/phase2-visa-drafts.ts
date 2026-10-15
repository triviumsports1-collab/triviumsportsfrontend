/**
 * UNPUBLISHED Phase 2 draft. Do not import this module from any route, layout,
 * metadata, sitemap, or component.
 *
 * Held until Trivium has a first approved case and immigration counsel has
 * reviewed the copy. The notes below record why the previous public wording
 * cannot be republished as-is.
 *
 * Known problems (counsel review required before any of this is public):
 * - P-1 for coaches is typically P-1S essential support tied to a specific P-1A
 *   athlete. It is not a general route for staying on as a club coach, and it
 *   is not a standard path after OPT.
 * - O-1 athletics is O-1A. College results alone are far below the
 *   extraordinary-ability standard. Arts fall under O-1B, not athletics.
 * - Do not name a firm or attorney. Use "we work with immigration counsel."
 * - Do not use the phrases "legal support" or "legal clarity."
 */

export const phase2VisaDraft = {
  status: "unpublished",
  heldBecause: "No approved case yet. Counsel has not signed off.",
  notes: [
    "Keep OPT and STEM OPT on the public site. This file is only for later O-1 and P-1 explanation.",
    "Hyphenate O-1 and P-1 if a future page is approved.",
  ],
  drafts: [
    {
      q: "What is the O-1 visa?",
      a: "DRAFT — DO NOT PUBLISH. Previous site text treated collegiate playing experience as enough for extraordinary ability and mixed athletics with arts. Counsel must rewrite this before it is used.",
    },
    {
      q: "What is the P-1 visa?",
      a: "DRAFT — DO NOT PUBLISH. Previous site text described P-1 as a general visa for athletes and coaches and as a path after OPT. Counsel must rewrite this before it is used.",
    },
  ],
} as const;
