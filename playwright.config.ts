import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : [["list"]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? (process.env.CI ? "http://127.0.0.1:3001" : "http://localhost:3000"),
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: process.env.CI
    ? {
        command: "npx next start -p 3001",
        url: "http://127.0.0.1:3001",
        reuseExistingServer: false,
        timeout: 120_000,
        env: {
          API_BASE_URL: process.env.API_BASE_URL ?? "http://127.0.0.1:8080",
        },
      }
    : undefined,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.CI ? {} : { channel: "chrome" as const }),
      },
    },
  ],
});
