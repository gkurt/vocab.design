import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The full band: position, identity, description, status, and the page's own actions.
  { assert: { selector: '[data-part=header]', state: 'visible' } },
  { assert: { selector: '[data-part=crumbs]', state: 'visible' } },
  { assert: { selector: '[data-part=description]', state: 'visible' } },
  { assert: { selector: '[data-part=meta]', state: 'visible' } },
  { assert: { selector: '[data-part=primary]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-compact]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-compact][aria-selected="true"]', state: 'visible' } },
  // Condensed: the supporting matter goes, the title and the primary action stay, and
  // the list below is exactly where it was.
  { assert: { selector: '[data-part=crumbs]', state: 'hidden' } },
  { assert: { selector: '[data-part=description]', state: 'hidden' } },
  { assert: { selector: '[data-part=meta]', state: 'hidden' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=primary]', state: 'visible' } },
  { assert: { selector: '[data-part=content]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names a density, so the way back is a density too, not an undo.
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=header][data-density="full"]', state: 'visible' } },
  { assert: { selector: '[data-part=crumbs]', state: 'visible' } },
  { assert: { selector: '[data-part=meta]', state: 'visible' } },
  { wait: 800 },
]);
