/**
 * Chrome-side analytics: the two things the graph does that a page view cannot see.
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

const article = document.querySelector<HTMLElement>('article[data-term]');
if (article) {
  reportAliasHandoff(article);
  wireGraph(article);
}
