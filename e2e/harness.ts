import { readdirSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import { parse } from 'yaml';
import type { StageAudit } from '#src/stage/specimen-stage.ts';

const TERMS_DIR = 'src/content/terms';

/** Where the identify stills land, and where the contact sheet goes looking for them. */
export const IDENTIFY_SHOTS = 'e2e/__artifacts__/identify';
export const SUBJECT_SNAPSHOTS = 'e2e/__snapshots__';
export const CONTACT_SHEET = 'e2e/__artifacts__/identify.html';

export interface Specimen {
  slug: string;
  /** Headword, as the specimen pin prints it. */
  name: string;
}

/**
 * Every term that ships a specimen, discovered from the content collection so a
 * new demo is covered the moment its term declares one. Frontmatter is read for
 * the three fields the harness needs and nothing more: shape and integrity are
 * `bun validate`'s job, and duplicating the schema here would only give the two
 * gates a chance to disagree.
 */
export function specimens(): Specimen[] {
  const found: Specimen[] = [];
  for (const file of readdirSync(TERMS_DIR).sort()) {
    if (!file.endsWith('.mdx')) continue;
    const frontmatter = readFileSync(join(TERMS_DIR, file), 'utf8').match(/^---\n([\s\S]*?)\n---/)?.[1];
    if (!frontmatter) continue;
    const data = parse(frontmatter) as { name?: string; demo?: string };
    if (!data.name || !data.demo || data.demo === 'none') continue;
    found.push({ slug: basename(file, '.mdx'), name: data.name });
  }
  return found;
}

/**
 * Open a term page and wait for its specimen to be mounted and painted. The
 * stage mounts behind two dynamic imports, so "the page loaded" is not the same
 * question as "the demo is on stage".
 */
export async function openStage(page: Page, slug: string): Promise<Locator> {
  await page.goto(`/${slug}`);
  await page.waitForFunction(() => !!document.querySelector('[data-stage-canvas]')?.shadowRoot?.querySelector('.sp-root'));
  // Metrics settle before anything measures or photographs a specimen.
  await page.evaluate(() => document.fonts.ready);
  const stage = page.locator('vd-stage');
  await expect(stage).toBeVisible();
  return stage;
}

/** Run the choreography once through the real player (SPEC §8). */
export function audit(stage: Locator): Promise<StageAudit> {
  return stage.evaluate((el) => (el as HTMLElement & { audit(): Promise<StageAudit> }).audit());
}

/**
 * Is the annotation actually drawn on the specimen? `toBeVisible` is not enough:
 * the stage body clips its overflow, so a spotlight placed six pixels past the
 * frame or a pin hung below it is present, laid out, and photographs as nothing
 * at all. Ask where it landed instead.
 */
export async function expectDrawnOnStage(stage: Locator, part: string): Promise<void> {
  const body = await stage.locator('.vd-stage-body').boundingBox();
  const drawn = await stage.locator(part).boundingBox();
  expect(body, 'the stage body has no box').not.toBeNull();
  expect(drawn, `${part} has no box`).not.toBeNull();
  if (!body || !drawn) return;
  const overlapX = Math.min(body.x + body.width, drawn.x + drawn.width) - Math.max(body.x, drawn.x);
  const overlapY = Math.min(body.y + body.height, drawn.y + drawn.height) - Math.max(body.y, drawn.y);
  expect(Math.min(overlapX, overlapY), `${part} is drawn outside the stage body, where the frame clips it`).toBeGreaterThan(0);
}

export interface Subject {
  /** The whole specimen is the term, so there is no part for identify to ring. */
  wholeScene: boolean;
  /** The committed snapshot body. */
  report: string;
}

/**
 * What the specimen says it is: the shape of the `data-subject` element identify
 * rings. Structural only, with no measurements, so the snapshot reads the same
 * on every platform and changes only when a demo changes its mind about what the
 * term names.
 */
export async function describeSubject(stage: Locator, name: string): Promise<Subject> {
  const found = await stage.evaluate((el) => {
    const root = el.querySelector('[data-stage-canvas]')?.shadowRoot?.querySelector('.sp-root');
    const subject = root?.querySelector('[data-subject]');
    if (!root || !subject) return null;
    // Everything but presentation. State attributes belong here: whether the subject
    // carries `data-open` or `data-revealed` when identify rings it is the difference
    // between a summon that worked and a spotlight around a closed surface.
    const skip = new Set(['class', 'style', 'id', 'data-subject']);
    const attributes = [...subject.attributes]
      .filter((a) => !skip.has(a.name))
      .map((a) => (a.value ? `[${a.name}=${a.value}]` : `[${a.name}]`))
      .sort()
      .join('');
    const classes = [...subject.classList].map((c) => `.${c}`).join('');
    return {
      // data-subject on the demo's top-level wrapper means "the whole scene is the subject".
      wholeScene: subject === root.firstElementChild,
      selector: `${subject.tagName.toLowerCase()}${classes}${attributes}`,
      text: (subject.textContent ?? '').replace(/\s+/g, ' ').trim().slice(0, 80),
    };
  });
  if (!found) return { wholeScene: false, report: `term:    ${name}\nsubject: MISSING\n` };
  return {
    wholeScene: found.wholeScene,
    report: [
      `term:    ${name}`,
      `scope:   ${found.wholeScene ? 'whole scene' : 'element'}`,
      `subject: ${found.selector}`,
      `text:    ${found.text}`,
      '',
    ].join('\n'),
  };
}
