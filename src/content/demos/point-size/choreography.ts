import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 400 },
  { assert: { selector: '[data-part=word]', state: 'visible' } },
  { assert: { selector: '[data-part=guides]', state: 'visible' } },
  { wait: 900 },
  // Absolute sizes, never a flip: each pick names the state it reaches, so a pass
  // joined halfway still lands on a stated size (SPEC §8). The value starts with a
  // digit, so the selector quotes it.
  { moveTo: '[data-part=seg-40]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=word][data-size="40"]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-12]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=word][data-size="12"]', state: 'visible' } },
  { moveTo: '[data-part=legend]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { moveTo: '[data-part=seg-24]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=word][data-size="24"]', state: 'visible' } },
  { assert: { selector: '[data-part=body][data-size="24"]', state: 'visible' } },
  { wait: 800 },
]);
