/**
 * A wrong URL, answered with the right one. Terms live at the root and are guessed at by
 * hand (`/hamburger`, `/snakbar`), so the last segment of a 404 is nearly always an
 * attempt at a headword: near enough to correct, and worth recording either way. What
 * gets typed here and matches nothing is the same signal as a search that finds nothing
 * (SPEC §10), which is to say a missing alias or a missing term.
 *
 * The matching itself is `#src/lib/nearest.ts`, shared with the search box: the same slip
 * arrives at both doors, and only one of them used to answer it.
 */
import { nearest, type Paths } from '#src/lib/nearest.ts';
import { onPage } from '#src/lib/on-page.ts';
import { track } from '#src/lib/track.ts';
import { canonicalPath, pageUrl } from '#src/lib/url.ts';

/** Beyond four edits a suggestion stops being a correction and starts being a guess. */
const MAX_EDITS = 4;
const SHOWN = 5;

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
  const matches: Match[] = [];
  // Wider than a search correction on purpose: nothing here is auto-run on the reader's
  // behalf, so a loose suggestion costs a glance, while no suggestion costs the visit.
  for (const near of nearest(query, paths, { cap: MAX_EDITS, contains: true }).slice(0, SHOWN)) {
    const name = paths.terms[near.target];
    if (!name) continue;
    if (near.slug === near.target) matches.push({ href: near.target, label: name });
    else matches.push({ href: near.target, label: near.slug.replace(/-/g, ' '), note: `another name for ${name}` });
  }
  return matches;
}

async function suggest(signal: AbortSignal): Promise<void> {
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
    const response = await fetch(pageUrl('/paths.json'), { signal });
    paths = (await response.json()) as Paths;
  } catch {
    // An abort lands here too, and a page the reader has already left is not a page that
    // failed to find anything: it is one nobody is waiting on.
    if (signal.aborted) return;
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
    link.addEventListener('click', () => track('not_found_recovered', { path: location.pathname, to: match.href }), { signal });
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

// The 404 is a page like any other under the router: a link to a term that has been
// renamed swaps this in, keeping the URL that missed, so the guessing runs per page.
onPage((signal) => void suggest(signal));
