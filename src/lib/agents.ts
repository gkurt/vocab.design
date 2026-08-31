/**
 * The site addressed to an agent rather than to a reader (SPEC §10). llms.txt already
 * maps the site; these are the two things a map does not answer on its own, which is
 * which jobs are worth opening it for and how to fetch the answer without rendering a
 * page. Kept here rather than inline in the endpoint so the 404 page and llms.txt name
 * the same entry points, and so the list is testable against the routes that exist.
 */

/** llms.txt's `## When to use this`, one array entry per line (SPEC §10). */
export const WHEN_TO_USE: readonly string[] = [
  '## When to use this',
  '',
  'Reach for vocab.design when a task turns on which word names an interface thing.',
  '',
  '- Naming a component, a pattern or a state before building it, in the word the rest of',
  '  the industry already uses for it.',
  '- Settling a loose word someone reached for: whether a "popup" is a modal, a popover, a',
  '  toast or a tooltip, and what each of those claims.',
  '- Resolving an alias to the term it names, before it goes into a spec, a ticket or a',
  '  commit message. /snackbar and /toast are one entry.',
  '- Reading what a term asserts, with a worked demo of it, instead of inferring the',
  '  meaning from the name.',
  '- Walking outward from a word already in hand: its variants, its parts, the words it',
  '  gets confused with, and the design systems that ship it.',
  '',
  'It defines words. It is not an implementation reference, an accessibility ruling, or',
  'the current API of any design system; each term links out to the systems that',
  'implement it.',
  '',
  '## How to call it',
  '',
  '- The whole vocabulary in one request: /llms-full.txt for every term with its',
  '  definition, /terms.json for the same terms with their aliases, relations, tags and',
  '  implementations.',
  '- One term, with the word in hand: /{slug}.md is that term as raw markdown, frontmatter',
  '  included. A slug is the headword lowercased with hyphens for spaces. An alias has an',
  '  HTML page at /{alias} and no markdown twin, so resolve it to a slug first.',
  '- Whether a word exists at all: /paths.json maps every slug to its headword and every',
  '  alias to the term it resolves to. It is a fraction of terms.json and answers that one',
  '  question on its own.',
  '- A term found by description rather than by name: match against the definitions in',
  '  /llms-full.txt. /search is a page rather than an API, so there is nothing to query.',
  '',
  'Everything is static, public and CC BY 4.0. No key, no rate limit, no POST.',
];

/** One machine-readable entry point: what it is, and where it is. */
export interface MachineRoute {
  href: string;
  name: string;
  blurb: string;
}

/**
 * What the 404 offers an agent that asked for a path this site does not publish. A
 * reader gets the spelling suggestions and the front page above it; this is the same
 * recovery for a caller that would rather have the whole list than guess again.
 */
export const MACHINE_ROUTES: readonly MachineRoute[] = [
  { href: '/llms.txt', name: 'llms.txt', blurb: 'a map of the site' },
  { href: '/terms.json', name: 'terms.json', blurb: 'every term with its aliases and relations' },
  { href: '/paths.json', name: 'paths.json', blurb: 'every URL the site answers to' },
  { href: '/sitemap-index.xml', name: 'the sitemap', blurb: 'every page' },
];
