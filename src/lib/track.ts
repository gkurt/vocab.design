/**
 * The one way the site talks to analytics.
 *
 * `window.gtag` exists only when a measurement ID was configured at build time AND the
 * reader is not opted out (see Analytics.astro), so every call here is a no-op by
 * default: in dev, in a fork with no ID, under Do Not Track, and behind a blocker. That
 * is deliberate, so call sites never have to ask whether analytics is on.
 */

type Value = string | number | boolean;
export type Params = Record<string, Value | undefined>;

declare global {
  interface Window {
    gtag?: {
      (command: 'event', name: string, params?: Params): void;
      /** Parameters every later event carries. The tag's own `config` sets them once. */
      (command: 'set', params: Params): void;
    };
  }
}

/** GA4 truncates a parameter value at 100 characters, and a query can be a sentence. */
const MAX_VALUE = 100;

export function clip(value: string): string {
  return value.length > MAX_VALUE ? value.slice(0, MAX_VALUE) : value;
}

export function track(name: string, params: Params = {}): void {
  const gtag = window.gtag;
  if (!gtag) return;
  gtag('event', name, clean(params));
}

/**
 * A page view for a page the browser never loaded.
 *
 * The tag counts one view when it starts up, which under client-side navigation is the
 * first page of a visit and no other: everything after that is a swapped document in the
 * same realm, and a reader who reads six terms would be a reader who read one. So a
 * navigation says so itself. `set` first, because the two parameters that describe the
 * page are sticky ones from the tag's `config` (SPEC §10) and would otherwise still
 * describe the page the reader has left, on this view and on every event after it.
 */
export function pageView(page: Params): void {
  const gtag = window.gtag;
  if (!gtag) return;
  // Every parameter is stated, the empty ones included, because `set` MERGES: one left
  // out keeps whatever the page before it had, and a term's category would follow the
  // reader out onto the listings. Empty rather than absent is also what the tag's own
  // `config` sends on a cold load, so the two paths report the same shape.
  const sticky: Params = {};
  for (const [key, value] of Object.entries(page)) sticky[key] = typeof value === 'string' ? clip(value) : (value ?? '');
  gtag('set', sticky);
  gtag('event', 'page_view', { page_location: location.href, page_title: document.title });
}

function clean(params: Params): Params {
  const out: Params = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    out[key] = typeof value === 'string' ? clip(value) : value;
  }
  return out;
}
