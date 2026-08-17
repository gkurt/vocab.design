import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=palette][data-scheme=triadic]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-2]', state: 'visible' } },
  // Three members, so the fourth slot is reserved but empty.
  { assert: { selector: '[data-part=swatch-3]', state: 'hidden' } },
  { assert: { selector: '[data-part=wheel]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=palette][data-scheme=split]', state: 'visible' } },
  { assert: { selector: '[data-part=spacing]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-square]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=palette][data-scheme=square]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-3]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-triadic]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=palette][data-scheme=triadic]', state: 'visible' } },
  { assert: { selector: '[data-part=app-button]', state: 'visible' } },
  { wait: 900 },
]);
