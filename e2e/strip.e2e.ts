import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { openStage, specimens } from './harness.ts';

/**
 * The strip is the exhibit's own row, drawn by the stage under the specimen (SPEC §5.1,
 * §6). Because it lives outside the specimen's surface, it is outside everything the
 * stage listens to: takeover is wired to the shadow root, so a reader pressing the mode
 * switch was heard by nobody, attract carried on over the top of them and the next pass
 * put the mode back. Nothing caught that. The ghost cursor reaches the strip through the
 * player, and a synthesized `click()` runs the demo's handler directly, so BOTH of the
 * ways this file could have been written would have passed while a real reader was
 * ignored. Only a trusted event proves it, which is what `locator.click()` sends.
 */
const withStrip = specimens().filter(({ slug }) => {
  try {
    return /data-stage-mode\b/.test(readFileSync(`src/content/demos/${slug}/demo.ts`, 'utf8'));
  } catch {
    return false;
  }
});

for (const { slug } of withStrip) {
  test(`${slug}: pressing the strip hands the stage to the reader`, async ({ page }) => {
    const stage = await openStage(page, slug);
    await stage.scrollIntoViewIfNeeded();
    const buttons = page.locator('[data-stage-strip] button');
    await expect(buttons, 'the stage drew no mode control').not.toHaveCount(0);
    await expect(stage, 'the specimen never started playing').toHaveAttribute('data-state', 'attract');

    const other = buttons.nth(1);
    const wanted = await other.getAttribute('data-value');
    await other.click();

    await expect(stage, 'a press on the strip did not take the stage over').toHaveAttribute('data-state', 'user');
    await expect(other, 'the control does not show the mode it just chose').toHaveAttribute('aria-pressed', 'true');
    const mode = () =>
      stage.evaluate(
        (el) =>
          (el as HTMLElement & { specimenRoot?: HTMLElement }).specimenRoot?.querySelector<HTMLElement>('sp-segmented[data-stage-mode]')
            ?.dataset.value,
      );
    expect(await mode(), 'the demo did not change mode').toBe(wanted);

    // And it has to STAY the reader's. Attract resuming here would silently undo the one
    // choice they made, which is the whole reason a press has to count as intent.
    await page.waitForTimeout(6000);
    await expect(stage, 'attract resumed over the reader').toHaveAttribute('data-state', 'user');
    expect(await mode(), 'the mode was put back while the reader was still holding it').toBe(wanted);

    // The other half of the same contract: the specimen hands the stage back an idle beat
    // after the pointer leaves, and the strip has to as well. It did not, and one press on
    // the mode switch held the stage in user mode for the rest of the visit, so the
    // demonstration never played again.
    await page.mouse.move(4, 4);
    await expect(stage, 'the stage was never handed back after the reader left').toHaveAttribute('data-state', 'attract', {
      timeout: 8000,
    });
  });
}
