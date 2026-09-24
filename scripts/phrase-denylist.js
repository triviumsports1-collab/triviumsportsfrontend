#!/usr/bin/env node
/**
 * Phrase denylist for public marketing copy (PRD §2.2 / NFR-7).
 * Authenticated SaaS routes are out of scope — they may use operations language.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SCAN_DIRS = [
  "app/(marketing)",
  "components/marketing",
  "components/seo",
  "components/forms",
  "lib/content",
];
const SCAN_FILES = ["lib/seo.ts", "lib/schema.ts", "lib/site.ts", "app/robots.ts", "app/sitemap.ts", "app/layout.tsx"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".md", ".css", ".html"]);
const SKIP_DIR_NAMES = new Set(["node_modules", ".next", "dist", "coverage"]);

const TERMS = [
  { label: "EOR", pattern: /\beor\b/i },
  { label: "employer of record", pattern: /employer\s+of\s+record/i },
  { label: "payroll", pattern: /\bpayroll\b/i },
  { label: "markup", pattern: /\bmarkup\b/i },
  { label: "bill rate", pattern: /\bbill\s+rate\b/i },
  { label: "pay rate", pattern: /\bpay\s+rate\b/i },
  { label: "Stripe", pattern: /\bstripe\b/i },
];

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") && entry.isDirectory()) continue;
    if (SKIP_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const hits = [];

function scanFile(absFile) {
  const content = fs.readFileSync(absFile, "utf8");
  const lines = content.split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const term of TERMS) {
      if (term.pattern.test(line)) {
        hits.push({
          file: path.relative(ROOT, absFile).replaceAll("\\", "/"),
          line: index + 1,
          term: term.label,
          text: line.trim(),
        });
      }
      term.pattern.lastIndex = 0;
    }
  });
}

for (const relDir of SCAN_DIRS) {
  const absDir = path.join(ROOT, relDir);
  for (const file of walk(absDir)) {
    scanFile(file);
  }
}
for (const relFile of SCAN_FILES) {
  const absFile = path.join(ROOT, relFile);
  if (fs.existsSync(absFile)) {
    scanFile(absFile);
  }
}

if (hits.length > 0) {
  console.error("Phrase denylist failed. Prohibited terms in public marketing copy:\n");
  for (const hit of hits) {
    console.error(`${hit.file}:${hit.line}: [${hit.term}] ${hit.text}`);
  }
  console.error(`\n${hits.length} hit(s). Remove EOR/payroll/markup/Stripe language from public pages.`);
  process.exit(1);
}

console.log("Phrase denylist passed. No prohibited terms on public marketing surfaces.");
process.exit(0);
