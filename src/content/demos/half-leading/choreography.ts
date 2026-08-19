import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line][data-leading="1.8"]', state: 'visible' } },
  // Both halves are drawn, and both are the term: the pair is what "half" means.
  { assert: { selector: '[data-part=band-top]', state: 'visible' } },
  { assert: { selector: '[data-part=band-bottom]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the line height it reaches.
  { moveTo: '[data-part=seg-2-8]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-leading="2.8"]', state: 'visible' } },
  { assert: { selector: '[data-part=line][data-leading="1.8"]', state: 'hidden' } },
  { assert: { selector: '[data-part=band-top]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { moveTo: '[data-part=seg-2-3]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-leading="2.3"]', state: 'visible' } },
  { assert: { selector: '[data-part=band-bottom]', state: 'visible' } },
  { wait: 700 },
]);
