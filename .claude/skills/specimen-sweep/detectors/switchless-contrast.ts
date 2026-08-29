/**
 * Switchless contrast: a demo that draws the term AND its foil at the same time, side by
 * side, with no mode switch between them (SPEC §5.1). `flat-design` was the worked
 * example: two cards at once, a small word under each, and the reader left to work out
 * which half was the headword. It now draws one card and a stage-drawn switch restyles it.
 *
 * Two signals, either of which shortlists a demo that carries no `data-stage-mode`:
 *
 *   parallel  a block drawn two to four times where the repeat DECIDES which copy is the
 *             subject and which is scenery: a template taking a `subject`/`context` flag
 *             (`anticipation`'s `lane()`, `constructivism`'s `column()`), or a map whose
 *             body puts `data-subject` or `sp-context` behind a ternary.
 *   foil      two labels from one antonym pair standing as literal text (`arc-motion`'s
 *             "Straight, one timing" against "Arc, a timing per axis").
 *
 * Recall-tuned, and it cannot tell a comparison from an anatomy: `chamfer` draws three
 * corner treatments because the term is one of three, which is teaching rather than a foil.
 * The output is a shortlist for a judge, never a worklist for a fixer.
 *
 *   bun .claude/skills/specimen-sweep/detectors/switchless-contrast.ts
 */
import { readFileSync, readdirSync } from 'node:fs';

const ROOT = 'src/content/demos';

const FOILS: [RegExp, RegExp][] = [
  [/\bwith\b/i, /\bwithout\b/i],
  [/\bbefore\b/i, /\bafter\b/i],
  [/\bplain\b/i, /\b(eased|animated|styled|shaped)\b/i],
  [/\bstraight\b/i, /\barc\b/i],
  [/\blinear\b/i, /\b(eased|curved)\b/i],
  [/\bflat\b/i, /\b(depth|glossed|bevel)/i],
  [/\bno\s+\w+/i, /\bwith\s+\w+/i],
  [/\bevery\s+\w+/i, /\bnone\b/i],
  [/\bthe old\b/i, /\bthe new\b/i],
];

const decides = (body: string) =>
  /\?[^`]{0,80}data-subject|data-subject[^`]{0,40}:\s*''/.test(body) ||
  /\?[^`]{0,80}sp-context|sp-context[^`]{0,40}:\s*''/.test(body) ||
  /\$\{\s*\w+\s*\?\s*'[^']*(?:data-subject|sp-context)/.test(body);

const flagged = (params: string) => /\b(subject|context|foil|baseline|is[A-Z]\w*)\b/.test(params);

/** The template literal that starts at `open`, so a signal reads one block and not the file. */
const literal = (source: string, open: number) => {
  const start = source.indexOf('`', open);
  if (start < 0) return '';
  for (let i = start + 1; i < source.length; i++) {
    if (source[i] === '\\') i++;
    else if (source[i] === '`') return source.slice(start, i);
  }
  return '';
};

const labels = (source: string) => [...source.matchAll(/>([A-Z][^<>{}`$]{3,44})</g)].map(([, text]) => text.trim());

type Hit = { slug: string; evidence: string[] };
const hits: Hit[] = [];

for (const slug of readdirSync(ROOT).sort()) {
  let source: string;
  try {
    source = readFileSync(`${ROOT}/${slug}/demo.ts`, 'utf8');
  } catch {
    continue;
  }
  if (source.includes('data-stage-mode')) continue;

  const evidence: string[] = [];

  for (const match of source.matchAll(/(?:const (\w+) = )?\(([^)]*)\)(?::[^=]*?)?\s*=>\s*`/g)) {
    const [, name, params] = match;
    const body = literal(source, match.index);
    // A flagged template is a block whatever it draws: `constructivism`'s `column()` takes its
    // parts as an argument, so requiring `data-part` in the literal would miss it.
    if (!body.includes('data-part') && !flagged(params)) continue;
    // `const lane = (...) =>` never spells `lane(`, so every match of the name IS a call site.
    const calls = name ? [...source.matchAll(new RegExp(`\\b${name}\\(`, 'g'))].length : 2;
    if (calls < 2 || calls > 4) continue;
    if (decides(body) || flagged(params)) evidence.push(`parallel:${name ?? 'map'}() x${calls}`);
  }

  const text = labels(source);
  for (const [left, right] of FOILS) {
    const a = text.find((line) => left.test(line));
    const b = text.find((line) => right.test(line) && line !== a);
    if (a && b) {
      evidence.push(`foil:"${a}" / "${b}"`);
      break;
    }
  }

  if (evidence.length) hits.push({ slug, evidence });
}

for (const hit of hits) console.log(`${hit.slug}\t${hit.evidence.join(' ')}`);
console.error(`${hits.length} switchless candidates`);
