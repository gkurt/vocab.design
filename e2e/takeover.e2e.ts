import { expect, test } from '@playwright/test';
import { openStage, specimens, subjectBox } from './harness.ts';

/**
 * The gesture that wakes a specimen has to land, on the specimen the reader was
 * looking at (SPEC §7: state is handed over as-is). A pose used to be an inert
 * clone, and waking it swapped in a fresh mount from pointerdown, so the click
 * that followed had no node left to fire on and the demo had silently gone back
 * to its first frame underneath. The 150 ms hover dwell hid it, since a pointer
 * that rests before pressing wakes the demo first: it was the quick click, the
 * one that arrives in the same motion as the pointer, that disappeared. Under
 * reduced motion the stage rests on a pose, so that was every specimen on the
 * site for those visitors.
 *
 * Both halves are one question here: did the click reach a node that was already
 * on stage when the specimen was posed? A swallowed click records nothing, and a
 * click on a tree the stage had just rebuilt records an element the pose never
 * contained. Listening in the capture phase keeps a demo that stops the click
 * from bubbling out of the verdict.
 */
test.use({ contextOptions: { reducedMotion: 'reduce' } });

interface Landed {
  /** Was the clicked element already there when the pose was taken? */
  posed: boolean;
  tag: string;
}

for (const { slug } of specimens()) {
  test(`${slug}: the click that wakes the pose lands on the specimen`, async ({ page }) => {
    const stage = await openStage(page, slug);
    // The pose settles behind a summon that may have to play most of the choreography
    // to bring the subject on stage, so wait for the stage to say so. Clicking before
    // then measures nothing: the summon is still synthesizing input of its own.
    await expect(stage, 'the stage never settled onto its pose').toHaveAttribute('data-posed', '');

    await stage.scrollIntoViewIfNeeded();
    const box = await subjectBox(stage);
    expect(box, 'the posed subject has no box to click').not.toBeNull();
    if (!box) return;

    await stage.evaluate((el) => {
      const root = (el as HTMLElement & { specimenRoot?: HTMLElement }).specimenRoot;
      // Whatever hears the click: the specimen's shadow root, or the document of its
      // frame, neither of which lets an event out. A subject drawn in the strip is not in
      // either (SPEC §5.1), so the root is taken from the subject itself, which is where
      // the click is about to land.
      const subject = el.querySelector('.vd-stage-strip [data-subject]') ?? root?.querySelector('[data-subject]');
      const events: Node | undefined = subject?.getRootNode() ?? root?.getRootNode() ?? undefined;
      if (!events) throw new Error('the specimen has no root to listen on');
      const landed: Landed[] = [];
      (window as unknown as { __landed: Landed[] }).__landed = landed;
      // Mark the tree the reader can see, so a rebuilt one is recognisable afterwards.
      for (const node of (events as ParentNode).querySelectorAll('*')) (node as HTMLElement & { __posed?: true }).__posed = true;
      events.addEventListener(
        'click',
        (event) => {
          const target = event.composedPath()[0] as HTMLElement & { __posed?: true };
          landed.push({ posed: target?.__posed === true, tag: target?.tagName?.toLowerCase() ?? 'unknown' });
        },
        true,
      );
    });

    // No pause between arriving and pressing: the dwell must not get to wake the
    // demo first, or the pose is not what gets clicked and the test proves nothing.
    await page.mouse.click(Math.round(box.x + box.width / 2), Math.round(box.y + box.height / 2));

    const landed = await page.evaluate(() => (window as unknown as { __landed: Landed[] }).__landed);
    // One gesture, but not always one target: a click on a <label> is forwarded to the
    // control it names, so the same press is heard twice. What matters is that it was
    // heard at all, and that every tree it reached is the one the pose was holding.
    expect(landed.length, 'the click woke the specimen but never reached it').toBeGreaterThan(0);
    const stale = landed.find((one) => !one.posed);
    expect(stale, `the click landed on a <${stale?.tag}> the pose never held: the stage rebuilt the demo first`).toBeUndefined();
  });
}
