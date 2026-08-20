import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=quote]', state: 'visible' } },
  // The attribution is part of what is set off, so it is claimed with the block.
  { assert: { selector: '[data-part=attribution]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the setting it reaches.
  { moveTo: '[data-part=seg-inline]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=inline-quote]', state: 'visible' } },
  { assert: { selector: '[data-part=quote]', state: 'hidden' } },
  { moveTo: '[data-part=caption]' },
  { wait: 700 },
  { assert: { selector: '[data-part=view-inline]', state: 'visible' } },
  // Ends on the block, which is what the term names.
  { moveTo: '[data-part=seg-block]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=quote]', state: 'visible' } },
  { assert: { selector: '[data-part=attribution]', state: 'visible' } },
  { assert: { selector: '[data-part=inline-quote]', state: 'hidden' } },
  { wait: 700 },
]);
