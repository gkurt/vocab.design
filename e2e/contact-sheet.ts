import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { absoluteUrl } from '#src/lib/url.ts';
import { CONTACT_SHEET, IDENTIFY_SHOTS, SUBJECT_SNAPSHOTS } from './harness.ts';

/**
 * Global teardown: the identify stills, gathered into one page (SPEC §8). The
 * per-specimen assertions already say whether a demo still points where it used
 * to; this is the other half of the same job, the review artifact where a person
 * can see what all twenty specimens claim their term is without opening twenty
 * files. CI uploads it; locally it is a file you open.
 *
 * Images are inlined so the sheet travels as one file.
 */
function escapeHtml(text: string): string {
  return text.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c] ?? c);
}

export default function contactSheet(): void {
  if (!existsSync(IDENTIFY_SHOTS)) return;
  const shots = readdirSync(IDENTIFY_SHOTS)
    .filter((file) => file.endsWith('.png'))
    .sort();
  if (shots.length === 0) return;

  const cards = shots.map((file) => {
    const slug = basename(file, '.png');
    const snapshot = join(SUBJECT_SNAPSHOTS, `${slug}-subject.txt`);
    const subject = existsSync(snapshot) ? readFileSync(snapshot, 'utf8').trim() : 'no subject snapshot recorded';
    const data = readFileSync(join(IDENTIFY_SHOTS, file)).toString('base64');
    return `<figure>
      <img src="data:image/png;base64,${data}" alt="${slug} with identify engaged" />
      <figcaption><a href=${JSON.stringify(absoluteUrl(`/${slug}`))}>${slug}</a><pre>${escapeHtml(subject)}</pre></figcaption>
    </figure>`;
  });

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Identify contact sheet · vocab.design</title>
<style>
  :root { color-scheme: light dark; --ink: #1c1a17; --paper: #fbfaf8; --line: #dcd8d0; --muted: #6d675d; }
  @media (prefers-color-scheme: dark) { :root { --ink: #eeebe5; --paper: #14130f; --line: #34312a; --muted: #9a938a; } }
  body { margin: 0; padding: 32px; background: var(--paper); color: var(--ink);
         font: 14px/1.5 ui-sans-serif, system-ui, sans-serif; }
  header { max-width: 60ch; margin-bottom: 28px; }
  h1 { font-size: 20px; margin: 0 0 6px; }
  header p { margin: 0; color: var(--muted); }
  .sheet { display: grid; gap: 24px; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
  figure { margin: 0; border: 1px solid var(--line); border-radius: 10px; overflow: hidden; background: var(--paper); }
  img { display: block; width: 100%; height: auto; border-bottom: 1px solid var(--line); }
  figcaption { padding: 10px 12px; }
  figcaption a { color: inherit; font-weight: 600; text-decoration: none; border-bottom: 1px solid var(--line); }
  pre { margin: 8px 0 0; color: var(--muted); font: 11px/1.5 ui-monospace, monospace; white-space: pre-wrap; }
</style>
</head>
<body>
<header>
  <h1>Identify contact sheet</h1>
  <p>${shots.length} specimens. Where the term names a part, identify is engaged: the spotlight rings it and the pin bears the headword. Where the whole scene is the term there is no part to point at, so the stage offers no identify control and the specimen is shown plain.</p>
</header>
<div class="sheet">${cards.join('\n')}</div>
</body>
</html>
`;

  mkdirSync(dirname(CONTACT_SHEET), { recursive: true });
  writeFileSync(CONTACT_SHEET, html);
  console.log(`\n  Identify contact sheet: ${CONTACT_SHEET} (${shots.length} specimens)\n`);
}
