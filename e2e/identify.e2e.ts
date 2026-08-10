import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { expect, test } from '@playwright/test';
import { describeSubject, expectDrawnOnStage, IDENTIFY_SHOTS, openStage, specimens } from './harness.ts';

/**
 * What each specimen claims the term is (SPEC §6, §8). Identify summons the
 * subject if it is not on stage, freezes a posed clone, and rings it; this pass
 * records both halves of that claim: a committed text snapshot of the subject's
 * shape, which fails the build when a demo starts pointing somewhere else, and a
 * still of the spotlight, collected into a contact sheet so a reviewer can take
 * in all twenty at once. Whole-scene subjects are photographed too, without
 * annotation, because "the term is the whole specimen" still has to be reviewable.
 *
 * Reduced motion is what makes the stills worth comparing: attract never runs,
 * the stage rests on the posed specimen, and kit animation is off, so every
 * photograph is of the same moment rather than of whenever the shutter fell.
 */
test.use({ contextOptions: { reducedMotion: 'reduce' } });

test.beforeAll(() => {
  mkdirSync(IDENTIFY_SHOTS, { recursive: true });
});

for (const { slug, name } of specimens()) {
  test(`${slug}: what the specimen says the term is`, async ({ page }, testInfo) => {
    const stage = await openStage(page, slug);
    // Every still in this file is only comparable because attract is off. If the
    // preference ever stops reaching the page, say so here rather than let twenty
    // snapshots start drifting for reasons no one can see.
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);

    const identify = stage.locator('[data-stage-identify]');
    if ((await describeSubject(stage, name)).wholeScene) {
      // Nothing to point at, so the stage offers nothing that would (SPEC §6). The
      // specimen still gets its still and its line in the record: "all of it" is an
      // answer, it just is not one a spotlight can give.
      await expect(identify, 'a whole-scene subject must not offer identify').toHaveCount(0);
    } else {
      await identify.hover();
      await expect(stage.locator('.vd-spotlight[data-visible]')).toBeVisible();
      await expect(stage.locator('.vd-subject-pin[data-visible]')).toHaveText(name);
      await expectDrawnOnStage(stage, '.vd-spotlight');
      await expectDrawnOnStage(stage, '.vd-subject-pin');
    }

    // Described after identify has engaged, not before: the state the subject is in
    // when the spotlight lands is half of what the specimen is claiming. A summoned
    // toast is open, and visually hidden text has been given its box back.
    const subject = await describeSubject(stage, name);
    expect(subject.report).toMatchSnapshot(`${slug}-subject.txt`);

    const still = await stage.locator('.vd-stage-body').screenshot({
      path: join(IDENTIFY_SHOTS, `${slug}.png`),
      animations: 'disabled',
    });
    await testInfo.attach('identify', { body: still, contentType: 'image/png' });
  });
}
