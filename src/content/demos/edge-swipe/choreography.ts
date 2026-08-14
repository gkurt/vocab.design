import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=phone][data-history=article]', state: 'visible' } },
  { assert: { selector: '[data-part=phone][data-outcome=none]', state: 'visible' } },
  // The same stroke, started well inside the screen: it belongs to the page and nothing peels.
  { moveTo: '[data-part=inside-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=inside-end]' } },
  { assert: { selector: '[data-part=phone][data-outcome=inside]', state: 'visible' } },
  { assert: { selector: '[data-part=phone][data-history=article]', state: 'visible' } },
  { wait: 900 },
  // Started at the edge, released short of the commit point: the screen falls back.
  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=short-dot]' } },
  { assert: { selector: '[data-part=phone][data-outcome=cancelled]', state: 'visible' } },
  { assert: { selector: '[data-part=phone][data-history=article]', state: 'visible' } },
  { wait: 900 },
  // Started at the edge and carried past it: the navigation commits.
  { moveTo: '[data-part=edge-dot]' },
  { wait: 500 },
  { drag: { to: '[data-part=far-dot]' } },
  { assert: { selector: '[data-part=phone][data-outcome=committed]', state: 'visible' } },
  { assert: { selector: '[data-part=phone][data-history=inbox]', state: 'visible' } },
  { wait: 1100 },
  // Put the article back on top, so every pass starts from the same screen.
  { moveTo: '[data-part=reopen]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=phone][data-history=article]', state: 'visible' } },
  { wait: 800 },
]);
