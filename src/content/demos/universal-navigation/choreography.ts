import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the page waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=universal]', state: 'visible' } },
  { assert: { selector: '[data-part=global]', state: 'visible' } },
  { assert: { selector: '[data-part=content][data-fold=clipped]', state: 'visible' } },
  { wait: 700 },

  // Take the bar away: the parent org goes with it, and the fourth row fits.
  { moveTo: '[data-part=seg-without]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=universal]', state: 'hidden' } },
  { assert: { selector: '[data-part=content][data-fold=clear]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4]', state: 'visible' } },
  { wait: 900 },

  // Put it back, which is the trade: a route to the parent, paid for in vertical space.
  { moveTo: '[data-part=seg-with]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=universal]', state: 'visible' } },
  { assert: { selector: '[data-part=content][data-fold=clipped]', state: 'visible' } },
  { assert: { selector: '[data-part=val-rows]', state: 'visible' } },
  { wait: 700 },
]);
