const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    timeout: 10000,
  },
  // fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    trace: "on-first-retry",
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        headless: true,
        viewport: { width: 1220, height: 1080 },
        args: ["--disable-http2"],
      },
    },
    {
      name: "Firefox",
      use: {
        ...devices["Desktop Firefox"],
        channel: "firefox",
        headless: true,
        viewport: { width: 1220, height: 1080 },
        args: ["--disable-http2"],
      },
    },
    {
      name: "WebKit",
      use: {
        ...devices["Desktop Safari"],
        channel: "webkit",
        headless: true,
        viewport: { width: 1220, height: 1080 },
        args: ["--disable-http2"],
      },
    },
  ],
});
