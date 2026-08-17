import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=paragraph]', state: 'visible' } },
  { assert: { selector: '[data-part=tints]', state: 'visible' } },
  { wait: 900 },
  // Absolute amounts, never a flip: each pick names the state it reaches, so a
  // pass joined halfway still lands on a stated setting (SPEC §8).
  { moveTo: '[data-part=seg-wider]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-spacing=wider]', state: 'visible' } },
  { moveTo: '[data-part=paragraph]' },
  { wait: 1300 },
  { moveTo: '[data-part=measured]' },
  { wait: 900 },
  { assert: { selector: '[data-part=measured]', state: 'visible' } },
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-spacing=wide]', state: 'visible' } },
  { moveTo: '[data-part=note]' },
  { wait: 900 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-spacing=normal]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
