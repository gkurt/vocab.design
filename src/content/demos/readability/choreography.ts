import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=paragraph]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 900 },
  // Absolute settings, never a flip: each pick names the state it reaches, so a
  // pass joined halfway still demonstrates the same thing (SPEC §8).
  { moveTo: '[data-part=seg-dense]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-setting=dense]', state: 'visible' } },
  { moveTo: '[data-part=paragraph]' },
  { wait: 1200 },
  { moveTo: '[data-part=seg-airy]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-setting=airy]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-comfortable]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=paragraph][data-setting=comfortable]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
