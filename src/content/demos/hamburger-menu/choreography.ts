import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 1600 },
  // The scrim is over the trigger while the panel is open, so it is what a real pointer reaches.
  { moveTo: '[data-part=scrim]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
]);
