import { expect, test } from '@playwright/test';
import { audit, openStage, specimens } from './harness.ts';

/**
 * The choreography is the demo's smoke test (SPEC §8). Every specimen plays its
 * own script once, through the real attract player, and has to satisfy every
 * `assert` on the way. Driving the player rather than Playwright's own input is
 * the point: a demo that answers a browser's click but not the player's
 * synthesized one would go still in attract mode, and only this catches it.
 *
 * Motion is left on. Cursor travel and the beats between steps are part of what
 * the demo is being timed against; a tooltip that only appears after its hover
 * delay has to be given that delay.
 */
for (const { slug, name } of specimens()) {
  test(`${slug}: the specimen does what its choreography claims`, async ({ page }) => {
    const stage = await openStage(page, slug);
    const report = await audit(stage);

    expect(report.subjects, `${name} must mark exactly one element with data-subject (SPEC §5)`).toBe(1);
    // Reported as text so a failure names the step and selector instead of a diff of objects.
    expect(report.failures.map((f) => `step ${f.step}: ${f.selector} should be ${f.expected}`)).toEqual([]);
    expect(report.interrupted, 'the run was cancelled part-way, so later asserts went unjudged').toBe(false);
  });
}
