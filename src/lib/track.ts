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
    gtag?: (command: 'event', name: string, params?: Params) => void;
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
  const clean: Params = {};
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) continue;
    clean[key] = typeof value === 'string' ? clip(value) : value;
  }
  gtag('event', name, clean);
}
