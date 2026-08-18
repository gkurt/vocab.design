import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=row-heading][data-density=default]', state: 'visible' } },
  { assert: { selector: '[data-part=card-heading]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { wait: 800 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the density it reaches.
  { moveTo: '[data-part=seg-compact]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row-heading][data-density=compact]', state: 'visible' } },
  { assert: { selector: '[data-part=size-heading]', state: 'visible' } },
  { moveTo: '[data-part=seg-large]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row-heading][data-density=large]', state: 'visible' } },
  { assert: { selector: '[data-part=card-caption]', state: 'visible' } },
  { moveTo: '[data-part=table]' },
  { wait: 900 },
  { assert: { selector: '[data-part=row-display]', state: 'visible' } },
  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=row-heading][data-density=default]', state: 'visible' } },
  { wait: 700 },
]);
