import { expect, test } from '@playwright/test';
import { openStage, specimens } from './harness.ts';

/**
 * Reduced motion must not manufacture transitions. The kit once flattened motion
 * with `transition-duration: 0.01ms` on `*`, and since `transition-property`
 * defaults to `all`, that created a transition on every property change of every
 * element: a demo that wrote a style and measured synchronously read the old
 * value for the length of the (tiny, but real) transition. The stack demo's
 * mount-time rhythm measurement was corrupted exactly this way. The kit now
 * declares `transition: none !important`, so a write lands before the next read.
 *
 * The probe fails both ways the rule can regress: back to a near-zero duration,
 * and the probe's declared transition is manufactured over the write; or gone
 * entirely, and the probe's own one-second transition runs. Either way the
 * synchronous read returns the old width.
 */
test.use({ contextOptions: { reducedMotion: 'reduce' } });

test('a style write under reduced motion is measurable in the same tick', async ({ page }) => {
  const [first] = specimens();
  if (!first) throw new Error('no specimens to probe');
  const stage = await openStage(page, first.slug);
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(true);

  const width = await stage.evaluate((el) => {
    const root = (el as HTMLElement & { specimenRoot?: HTMLElement }).specimenRoot;
    if (!root) throw new Error('the specimen has no root to probe');
    const probe = root.ownerDocument.createElement('div');
    probe.style.cssText = 'width: 10px; height: 10px; transition: width 1s linear';
    root.append(probe);
    // Commit the starting box, so the write below is one a transition could cover.
    probe.getBoundingClientRect();
    probe.style.width = '200px';
    const measured = probe.getBoundingClientRect().width;
    probe.remove();
    return measured;
  });
  expect(width, 'a style write was still transitioning when synchronously measured').toBe(200);
});
