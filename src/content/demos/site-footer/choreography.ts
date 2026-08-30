import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  // The sitemap-sized version: headed columns, a newsletter, the legal line.
  { assert: { selector: '[data-part=footer][data-mode=full]', state: 'visible' } },
  { assert: { selector: '[data-part=column-1]', state: 'visible' } },
  { assert: { selector: '[data-part=column-3]', state: 'visible' } },
  { assert: { selector: '[data-part=newsletter]', state: 'visible' } },
  { assert: { selector: '[data-part=legal]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-thin]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-thin][data-selected]', state: 'visible' } },
  // Collapsed to one line, and still the same region: legal and social survive.
  { assert: { selector: '[data-part=footer][data-mode=thin]', state: 'visible' } },
  { assert: { selector: '[data-part=column-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=newsletter]', state: 'hidden' } },
  { assert: { selector: '[data-part=legal]', state: 'visible' } },
  { assert: { selector: '[data-part=social]', state: 'visible' } },
  // Nothing above the footer moved: the page keeps its heading in place.
  { assert: { selector: '[data-part=main]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a footer, so the way back is a footer too, not an undo.
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=footer][data-mode=full]', state: 'visible' } },
  { assert: { selector: '[data-part=column-2]', state: 'visible' } },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 800 },
]);
