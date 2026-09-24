import { type APIRequestContext, type Page, expect } from "@playwright/test";

const PASSWORD = "correct-horse";

export type SeededHours = {
  coachEmail: string;
  clubEmail: string;
  password: string;
};

async function json(response: { ok: () => boolean; status: () => number; text: () => Promise<string> }) {
  const text = await response.text();
  if (!response.ok()) {
    throw new Error(`API ${response.status()}: ${text}`);
  }
  return JSON.parse(text) as Record<string, unknown>;
}

export async function seedHoursFixture(request: APIRequestContext, apiBase: string): Promise<SeededHours> {
  const stamp = Date.now();
  const coachEmail = `coach-${stamp}@triviumsports.test`;
  const clubEmail = `club-${stamp}@triviumsports.test`;

  const coach = await json(
    await request.post(`${apiBase}/api/v1/auth/register`, {
      data: { email: coachEmail, password: PASSWORD, role: "COACH" },
    }),
  );
  const club = await json(
    await request.post(`${apiBase}/api/v1/auth/register`, {
      data: { email: clubEmail, password: PASSWORD, role: "CLUB_DIRECTOR" },
    }),
  );

  const org = await json(
    await request.post(`${apiBase}/api/v1/organizations`, {
      headers: { Authorization: `Bearer ${String(club.accessToken)}` },
      data: { name: `E2E Tennis Club ${stamp}`, city: "Austin", state: "TX", sports: ["tennis"] },
    }),
  );

  await json(
    await request.post(`${apiBase}/api/v1/organizations/${String(org.id)}/members`, {
      headers: { Authorization: `Bearer ${String(club.accessToken)}` },
      data: { userId: String(coach.publicId), memberRole: "CLUB_STAFF" },
    }),
  );

  return { coachEmail, clubEmail, password: PASSWORD };
}

export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/login", { waitUntil: "domcontentloaded" });
  await expect(page.getByTestId("login-form")).toHaveAttribute("data-ready", "true", { timeout: 20_000 });
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
}

export async function signOut(page: Page) {
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/login/);
}
