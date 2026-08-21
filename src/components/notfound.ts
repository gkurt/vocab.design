/**
 * A wrong URL, answered with the right one. Terms live at the root and are guessed at by
 * hand (`/hamburger`, `/snakbar`), so the last segment of a 404 is nearly always an
 * attempt at a headword: near enough to correct, and worth recording either way. What
 * gets typed here and matches nothing is the same signal as a search that finds nothing
 * (SPEC §10), which is to say a missing alias or a missing term.
 */
import { track } from '#src/lib/track.ts';
import { canonicalPath, pageUrl } from '#src/lib/url.ts';

interface Paths {
  terms: Record<string, string>;
  aliases: Record<string, string>;
}

/** Beyond four edits a suggestion stops being a correction and starts being a guess. */
const MAX_EDITS = 4;
const SHOWN = 5;

/** Levenshtein, abandoned as soon as the row cannot come back under the cap. */
function distance(a: string, b: string, cap: number): number {
  if (Math.abs(a.length - b.length) > cap) return cap + 1;
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const row = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const value = Math.min((previous[j] ?? 0) + 1, (row[j - 1] ?? 0) + 1, (previous[j - 1] ?? 0) + cost);
      row.push(value);
      if (value < best) best = value;
    }
    if (best > cap) return cap + 1;
    previous = row;
  }
  return previous[b.length] ?? cap + 1;
}

/** The word someone was reaching for, as a slug: the last segment, minus any file name. */
function asked(pathname: string): string {
  const path = canonicalPath(pathname);
  const last = path.split('/').filter(Boolean).at(-1) ?? '';
  return last
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

interface Match {
  /** Where the link goes: a matched alias sends the reader to the term, not to the
   *  redirect page that would bounce them there. */
  href: string;
  label: string;
  note?: string;
}

function guess(query: string, paths: Paths): Match[] {
  const candidates: (Match & { slug: string; score: number })[] = [];
  const consider = (slug: string, href: string, label: string, note?: string) => {
    let score = distance(query, slug, MAX_EDITS);
    // Containment is its own kind of near miss: "grid" is a fair reach at "bento-grid".
    if (score > MAX_EDITS) {
      if (!slug.includes(query) && !query.includes(slug)) return;
      score = MAX_EDITS;
    }
    candidates.push({ slug, href, label, note, score });
  };

  for (const [slug, name] of Object.entries(paths.terms)) consider(slug, slug, name);
  for (const [slug, target] of Object.entries(paths.aliases)) {
    const name = paths.terms[target];
    if (name) consider(slug, target, slug.replace(/-/g, ' '), `another name for ${name}`);
  }

  return candidates.sort((a, b) => a.score - b.score || a.slug.length - b.slug.length || a.slug.localeCompare(b.slug)).slice(0, SHOWN);
}

async function suggest(): Promise<void> {
  const section = document.querySelector<HTMLElement>('[data-suggestions]');
  const list = section?.querySelector('ul');
  const query = asked(location.pathname);
  if (!section || !list || !query) {
    track('page_not_found', { path: location.pathname, suggestions: 0 });
    return;
  }

  const search = document.querySelector<HTMLAnchorElement>('[data-search-for]');
  if (search) {
    search.href = `${pageUrl('/search')}?q=${encodeURIComponent(query.replace(/-/g, ' '))}`;
    search.hidden = false;
  }

  let paths: Paths;
  try {
    const response = await fetch(pageUrl('/paths.json'));
    paths = (await response.json()) as Paths;
  } catch {
    track('page_not_found', { path: location.pathname, suggestions: 0 });
    return;
  }

  const matches = guess(query, paths);
  track('page_not_found', { path: location.pathname, asked: query, suggestions: matches.length });
  if (matches.length === 0) return;

  for (const match of matches) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = pageUrl(match.href);
    link.textContent = match.label;
    link.className = 'font-serif font-semibold hover:text-accent';
    link.addEventListener('click', () => track('not_found_recovered', { path: location.pathname, to: match.href }));
    item.append(link);
    if (match.note) {
      const note = document.createElement('span');
      note.className = 'text-sm text-muted';
      note.textContent = ` ${match.note}`;
      item.append(note);
    }
    list.append(item);
  }
  // The heading is a promise, so it stays hidden until there is something under it.
  section.hidden = false;
}

void suggest();
