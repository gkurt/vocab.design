import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the grid waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=grid][data-cap=held]', state: 'visible' } },
  { assert: { selector: '[data-part=margin-left]', state: 'visible' } },
  { assert: { selector: '[data-part=cap]', state: 'visible' } },
  { wait: 600 },

  // The smallest size, the only one where the pattern stacks.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grid][data-flow=stacked]', state: 'visible' } },
  { assert: { selector: '[data-part=margin-left]', state: 'hidden' } },
  { assert: { selector: '[data-part=val-grid]', state: 'visible' } },
  { wait: 800 },

  // Three columns again, fluid, still short of the cap.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grid][data-flow=columns]', state: 'visible' } },
  { assert: { selector: '[data-part=grid][data-cap=under]', state: 'visible' } },
  { assert: { selector: '[data-part=card-2]', state: 'visible' } },
  { wait: 800 },

  // The moment growth stops: the cap reached exactly, with no margin yet.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grid][data-cap=held]', state: 'visible' } },
  { assert: { selector: '[data-part=margin-left]', state: 'hidden' } },
  { wait: 800 },

  // Past it, where every extra pixel goes to the margins instead.
  { moveTo: '[data-part=seg-extra]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grid][data-cap=held]', state: 'visible' } },
  { assert: { selector: '[data-part=margin-right]', state: 'visible' } },
  { wait: 700 },
]);
