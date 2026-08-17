import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=widget][data-size=small]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2]', state: 'hidden' } },
  { wait: 600 },
  // Each segment names a slot size outright, so a pass resumed anywhere lands the same.
  // Every claim is made well clear of the 300 ms resize.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=widget][data-size=medium]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-large]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=widget][data-size=large]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4]', state: 'visible' } },
  { assert: { selector: '[data-part=slot]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-small]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=widget][data-size=small]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2]', state: 'hidden' } },
  { assert: { selector: '[data-part=cells]', state: 'visible' } },
  { wait: 800 },
]);
