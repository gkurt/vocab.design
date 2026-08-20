import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=view][data-mode=read]', state: 'visible' } },
  { assert: { selector: '[data-part=col-even]', state: 'visible' } },
  { assert: { selector: '[data-part=col-light]', state: 'visible' } },
  { assert: { selector: '[data-part=col-dark]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the way of looking it reaches.
  { moveTo: '[data-part=seg-squint]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=view][data-mode=squint]', state: 'visible' } },
  { assert: { selector: '[data-part=view][data-mode=read]', state: 'hidden' } },
  // A blur changes no box and no opacity: the blocks are all still there to compare.
  { assert: { selector: '[data-part=col-even]', state: 'visible' } },
  { assert: { selector: '[data-part=col-dark]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 900 },
  { assert: { selector: '[data-part=col-light]', state: 'visible' } },
  { moveTo: '[data-part=seg-read]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=view][data-mode=read]', state: 'visible' } },
  { assert: { selector: '[data-part=col-even]', state: 'visible' } },
  { wait: 700 },
]);
