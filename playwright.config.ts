import { defineConfig, devices } from '@playwright/test';

// Deliberately not the dev server's 4321. A dev server injects CSS through JS, so a
// specimen can mount before the stage has its height, and the run would be measuring
// a page no visitor ever gets.
const PORT = 4322;
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Choreography execution and identify snapshots, run against the built site
 * (SPEC §3, §8). Bun owns unit tests; anything that needs a real browser lives
 * here, in `*.e2e.ts` files so the two runners never fight over a file.
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: /.*\.e2e\.ts$/,
  outputDir: './e2e/.results',
  snapshotPathTemplate: '{testDir}/__snapshots__/{arg}{ext}',
  globalTeardown: './e2e/contact-sheet.ts',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // A specimen is timed against real beats: waits and cursor travel are the demo's own.
  timeout: 60_000,
  expect: { timeout: 10_000 },
  // Motion demos are timing-sensitive on a loaded CI box; one retry, never locally.
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI
    ? [['github'], ['html', { outputFolder: 'e2e/.report', open: 'never' }]]
    : [['list'], ['html', { outputFolder: 'e2e/.report', open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  webServer: {
    command: `bunx astro build && bunx astro preview --port ${PORT}`,
    url: BASE_URL,
    // Never reuse. Whatever is already answering on this port is some other build, and
    // a gate that quietly grades the wrong one is worse than a slow gate.
    reuseExistingServer: false,
    timeout: 180_000,
    stdout: 'pipe',
  },
});
