import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=container]', state: 'visible' } },
  // Below the cap the column is the viewport minus its padding, so nothing is capped yet.
  { assert: { selector: '[data-part=viewport][data-width=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=container][data-capped]', state: 'hidden' } },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-wide][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-width=wide]', state: 'visible' } },
  // The viewport grew, the column did not: the leftover became margin either side.
  { assert: { selector: '[data-part=container][data-capped]', state: 'visible' } },
  { assert: { selector: '[data-part=bleed]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=viewport][data-width=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=container][data-capped]', state: 'hidden' } },
  { assert: { selector: '[data-part=container]', state: 'visible' } },
  { wait: 800 },
]);
