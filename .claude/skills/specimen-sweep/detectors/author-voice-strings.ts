/**
 * Every visible string in every specimen, so author voice cannot hide behind a part name.
 *
 * `detectors/author-voice.ts` looked for prose parts (`caption`, `note`, `legend`), which
 * missed `bubble-toolbar`'s bare `sp-label` ("Select a run to summon it; click anywhere
 * else to send it away") and `coach-mark`'s button labelled by its justification ("New
 * teammate" for a control that only re-arms a beacon). This one reads the MARKUP: every
 * static text node and every meaningful attribute string, with the tag and classes around
 * it, so a judge can rule on the words themselves without opening the file.
 *
 * It classifies nothing. Sentence-shaped strings are common and honest in a mock product
 * (an email body, a toast, a help panel), and the difference is who is speaking, which is
 * not a property of the grammar. It emits one TSV row per string:
 *
 *   slug \t kind \t classes \t text
 *
 * where kind is `text`, `button`, `label` or `attr`.
 *
 *   bun .claude/skills/specimen-sweep/detectors/author-voice-strings.ts
 *   bun .claude/skills/specimen-sweep/detectors/author-voice-strings.ts --prose
 */
import { readFileSync, readdirSync } from 'node:fs';

const ROOT = 'src/content/demos';
const PROSE_ONLY = process.argv.includes('--prose');

/** Text long enough to be saying something, with no interpolation left in it. */
const SAYS_SOMETHING = (text: string) => text.trim().split(/\s+/).length >= 3;

const CLASS = /class="([^"]*)"/;
const TAG = /<([a-z-]+)\b/;

type Row = { slug: string; kind: string; classes: string; text: string };

const rows: Row[] = [];

for (const slug of readdirSync(ROOT).sort()) {
  let source: string;
  try {
    source = readFileSync(`${ROOT}/${slug}/demo.ts`, 'utf8');
  } catch {
    continue;
  }

  // Strip block comments: a docblock is the author talking to the next author, which is
  // the one place author voice belongs.
  const markup = source.replace(/\/\*[\s\S]*?\*\//g, '');

  for (const match of markup.matchAll(/(<[a-z-]+\b[^<>]*>)([^<>{}`$]+)</g)) {
    const [, open, raw] = match;
    const text = raw.replace(/\s+/g, ' ').trim();
    if (!text || !SAYS_SOMETHING(text)) continue;
    if (!/[a-z]{3}/i.test(text)) continue;

    const tag = TAG.exec(open)?.[1] ?? '';
    const classes = CLASS.exec(open)?.[1] ?? '';
    const kind = tag === 'button' ? 'button' : classes.includes('sp-label') ? 'label' : 'text';
    if (PROSE_ONLY && kind === 'text' && !/sp-text|sp-context/.test(classes)) continue;
    rows.push({ slug, kind, classes: classes.replace(/\bsp-/g, ''), text });
  }

  for (const match of markup.matchAll(/(?:aria-label|title|placeholder)="([^"{}`$]+)"/g)) {
    const text = match[1].replace(/\s+/g, ' ').trim();
    if (SAYS_SOMETHING(text)) rows.push({ slug, kind: 'attr', classes: '', text });
  }
}

for (const row of rows) console.log([row.slug, row.kind, row.classes, row.text].join('\t'));
console.error(`${rows.length} strings across ${new Set(rows.map((r) => r.slug)).size} specimens`);
