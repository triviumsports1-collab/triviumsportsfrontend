import { expect, test } from "@playwright/test";

const DENYLIST = [
  /\beor\b/i,
  /employer\s+of\s+record/i,
  /\bpayroll\b/i,
  /\bmarkup\b/i,
  /\bbill\s+rate\b/i,
  /\bpay\s+rate\b/i,
  /\bstripe\b/i,
];

test("marketing home has tennis H1 and no commercial ledger terms", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Tennis careers/i);
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Jobs" })).toHaveAttribute(
    "href",
    "/jobs",
  );
  const html = await page.content();
  for (const pattern of DENYLIST) {
    expect(html, `public HTML must not match ${pattern}`).not.toMatch(pattern);
  }
});

test("public job board lists tennis roles without commercial ledger terms", async ({ page }) => {
  const response = await page.goto("/jobs");
  expect(response?.ok()).toBeTruthy();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(/Open tennis coaching roles/i);
  await expect(page.getByRole("button", { name: "Show roles" })).toBeVisible();
  const html = await page.content();
  for (const pattern of DENYLIST) {
    expect(html, `public HTML must not match ${pattern}`).not.toMatch(pattern);
  }
});

test("unauthenticated dashboard redirects to login", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL(/\/login(\?|$)/);
  expect(new URL(page.url()).searchParams.get("next")).toBe("/dashboard");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Sign in");
});
