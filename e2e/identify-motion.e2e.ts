import { expect, test } from '@playwright/test';
import { openStage, specimens } from './harness.ts';

/**
 * Identify pressed mid-attract, with motion ON (SPEC §6). The identify pass runs
 * under reduced motion, where attract never plays and every pose is of the mount
 * state, so it can never catch the live class of bug: a subject parked at opacity
 * zero when the spotlight lands, or a pose of a state the subject's `data-pose`
 * calls dishonest. Both shipped before this pass existed and were found by hand.
 *
 * The probe is one deterministic moment: let attract own the stage, wait a beat so
 * the script is genuinely mid-flight, then hold identify and let the stage do
 * whatever it does (pose now, summon forward to an honest state, or reset to the
 * mount). Whatever it settles on is then held to the specimen's own claims: the
 * pose landed, exactly one subject, a real box, visible ink, and the `data-pose`
 * condition satisfied.
 */

const MID_ATTRACT_MS = 1500;
// A dishonest moment is refused, not failed: the stage plays or resets until the
// subject is honest, so the wait is bounded by the script, not by the transition.
const POSE_TIMEOUT_MS = 30_000;

for (const { slug, name } of specimens()) {
  test(`${slug}: identify mid-attract poses an honest state`, async ({ page }) => {
    const stage = await openStage(page, slug);
    expect(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)).toBe(false);

    const identify = stage.locator('[data-stage-identify]');
    if ((await identify.count()) === 0) return; // whole-scene subject: the control is withdrawn (SPEC §6)

    await expect(stage, 'attract never took the stage, so there is no mid-flight moment to probe').toHaveAttribute(
      'data-state',
      'attract',
      { timeout: 15_000 },
    );
    await page.waitForTimeout(MID_ATTRACT_MS);

    await identify.hover();
    await expect(stage, 'identify was held but the pose never settled').toHaveAttribute('data-posed', '', {
      timeout: POSE_TIMEOUT_MS,
    });
    // The pose settles the instant a reveal BEGINS (SPEC §6): a summon does not sit
    // out a fade, so opacity is judged after the fade has had its room. The beat cuts
    // both ways: a subject the pose caught fading OUT reads as transparent by now.
    await page.waitForTimeout(600);

    const verdict = await stage.evaluate((el) => {
      const root = (el as HTMLElement & { specimenRoot?: HTMLElement }).specimenRoot;
      const subjects = root ? [...root.querySelectorAll<HTMLElement>('[data-subject]')] : [];
      const s = subjects[0];
      if (!root || !s) return { subjects: subjects.length, box: false, seen: false, honest: false };
      const rect = s.getBoundingClientRect();
      // The pose is settled, so resting values are the truth: a box the reader could
      // find, ink the reader could see, and only the state the demo swore to.
      let opacity = 1;
      for (let node: HTMLElement | null = s; node && node !== root; node = node.parentElement)
        opacity *= Number.parseFloat(getComputedStyle(node).opacity) || 1;
      const condition = s.dataset.pose;
      return {
        subjects: subjects.length,
        box: rect.width > 1 && rect.height > 1,
        seen: opacity > 0.05,
        honest: !condition || s.matches(condition),
      };
    });
    expect(verdict.subjects, 'exactly one data-subject under the pose (SPEC §5)').toBe(1);
    expect(verdict.box, 'the posed subject has no box the ring could trace').toBe(true);
    expect(verdict.seen, 'the posed subject is transparent: identify rang something the reader cannot see').toBe(true);
    expect(verdict.honest, 'the posed state fails the subject’s own data-pose condition (SPEC §6)').toBe(true);

    await expect(stage.locator('.vd-subject-pin[data-visible]')).toHaveText(name);
  });
}
