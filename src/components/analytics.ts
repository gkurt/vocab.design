/**
 * Chrome-side analytics: the things a page view cannot see on its own.
 *
 * 1. Which relation a reader actually crossed. A page view says someone arrived at
 *    `/toast`; it does not say they got there from the "Which word?" table on
 *    `/snackbar-vs-toast`, which is the difference between the graph working and the
 *    graph merely existing. `data-rel` on a relation link names the kind; a link in the
 *    prose needs no markup at all, because an internal href inside the article IS a
 *    crossing (SPEC §2.3).
 * 2. Which alias was typed. Alias pages redirect in 0ms and carry no tag (loading one on
 *    a page that lives no time is waste), so the alias is handed to the target page
 *    through sessionStorage and reported there. Every alias is a search query we answer
 *    (SPEC §2.2), and this is the only way to learn which ones are asked.
 *
 * 3. Which header links get used. `data-nav` on one marks it as worth counting, and the
 *    two that already report themselves are deliberately unmarked: Search fires
 *    `search_open` from `SearchDialog.ts`, and the wordmark is just "go home".
 *
 * Everything here funnels through `track()`, which is a no-op unless the build carries a
 * measurement ID and the reader has not opted out.
 */

import { track } from '#src/lib/track.ts';

/** Written by the alias redirect page, read once by the term page it points at. */
const ALIAS_KEY = 'vd:alias';

function reportAliasHandoff(article: HTMLElement) {
  let handoff: string | null = null;
  try {
    handoff = sessionStorage.getItem(ALIAS_KEY);
    sessionStorage.removeItem(ALIAS_KEY);
  } catch {
    return; // Private modes throw on storage. An alias hit is not worth an exception.
  }
  if (!handoff) return;
  const [alias, term] = handoff.split('\n');
  // Only where it was headed: a reader who left the redirect for somewhere else entirely
  // would otherwise credit the alias to whatever page they landed on next.
  if (!alias || term !== article.dataset.term) return;
  track('alias_hit', { alias, term });
}

function wireGraph(article: HTMLElement) {
  article.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const link = (event.target as Element | null)?.closest?.('a');
    if (!(link instanceof HTMLAnchorElement)) return;
    // `to` is a path rather than a slug so it joins against GA's own page_path, and the
    // page the click happened on comes free with the event.
    const relation = link.dataset.rel ?? (link.closest('.article') && link.origin === location.origin ? 'prose' : undefined);
    if (!relation) return;
    track('relation_click', { relation, to: link.pathname });
  });
}

/**
 * Header links, marked with `data-nav`. Reported through `to`, the parameter the relation
 * events already use, so this needs no new custom dimension in GA to be readable: an
 * internal link reports its path and an outbound one reports its host, which is the whole
 * of what there is to know about a link to a profile or a repository.
 *
 * A click that leaves the site is measured on the way out, which gtag survives by handing
 * the hit to `navigator.sendBeacon`. `/random` is the case with no page of its own to
 * report from: it replaces itself before any tag could load, so this click IS the record
 * of it, and a reader who opens `/random` directly is not counted.
 */
function wireNav(header: HTMLElement) {
  header.addEventListener('click', (event) => {
    if (event.defaultPrevented) return;
    const link = (event.target as Element | null)?.closest?.('a[data-nav]');
    if (!(link instanceof HTMLAnchorElement)) return;
    track('nav_click', { to: link.origin === location.origin ? link.pathname : link.hostname });
  });
}

const header = document.querySelector<HTMLElement>('[data-header]');
if (header) wireNav(header);

const article = document.querySelector<HTMLElement>('article[data-term]');
if (article) {
  reportAliasHandoff(article);
  wireGraph(article);
}
