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
  await expect(page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Jobs" })).toHaveCount(0);
  await expect(
    page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Coaching after College" }),
  ).toHaveAttribute("href", "/coaching-after-college");
  await expect(page.getByText("Former Division I player")).toHaveCount(0);
  await expect(page.getByText("+1 623-255-0858")).toBeVisible();
  const html = await page.content();
  for (const pattern of DENYLIST) {
    expect(html, `public HTML must not match ${pattern}`).not.toMatch(pattern);
  }
});

test("public job board stays unpublished until roles are posted", async ({ page }) => {
  const response = await page.goto("/jobs");
  expect(response?.status()).toBe(404);
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
