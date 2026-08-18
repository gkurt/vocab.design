import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=set]', state: 'visible' } },
  { assert: { selector: '[data-part=show][data-member=serif]', state: 'visible' } },
  { moveTo: '[data-part=member-mono]' },
  { wait: 800 },
  { assert: { selector: '[data-part=member-sans]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the member it enlarges.
  { moveTo: '[data-part=seg-mono]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=show][data-member=mono]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { moveTo: '[data-part=seg-sans]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=show][data-member=sans]', state: 'visible' } },
  { moveTo: '[data-part=seg-serif]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=show][data-member=serif]', state: 'visible' } },
  { assert: { selector: '[data-part=member-serif]', state: 'visible' } },
  { wait: 700 },
]);
