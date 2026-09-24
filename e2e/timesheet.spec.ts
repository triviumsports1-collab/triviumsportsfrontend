import { expect, test } from "@playwright/test";
import { seedHoursFixture, signIn, signOut } from "./helpers";

const apiBase = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

test.describe.configure({ mode: "serial", timeout: 60_000 });

test("coach submits hours and club director approves them", async ({ page, request }) => {
  const seed = await seedHoursFixture(request, apiBase);
  const day = new Date().toISOString().slice(0, 10);

  await signIn(page, seed.coachEmail, seed.password);
  await page.getByRole("link", { name: "Hours" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Hours" })).toBeVisible();

  await page.getByLabel("Period start").fill(day);
  await page.getByLabel("Period end").fill(day);
  await page.getByLabel("Minutes worked").fill("90");
  await page.getByRole("button", { name: "Save draft" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Submit" })).toBeVisible({ timeout: 15_000 });
  await page.getByRole("button", { name: "Submit" }).click();
  await page.reload();
  await expect(page.getByText("SUBMITTED").first()).toBeVisible({ timeout: 15_000 });

  await signOut(page);

  await signIn(page, seed.clubEmail, seed.password);
  await page.getByRole("link", { name: "Hours" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Hours to review" })).toBeVisible();
  await page.getByRole("button", { name: "Approve" }).click();
  await page.reload();
  await expect(page.getByText("APPROVED").first()).toBeVisible({ timeout: 15_000 });
});
