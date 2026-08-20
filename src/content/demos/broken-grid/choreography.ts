import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the break waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=plate][data-fit=off-grid][data-broken]', state: 'visible' } },
  { assert: { selector: '[data-part=tracks]', state: 'visible' } },
  { assert: { selector: '[data-part=block-headline]', state: 'visible' } },
  { wait: 700 },

  // The same four blocks with every edge back on a track: the grid the plate was breaking.
  { moveTo: '[data-part=seg-on-grid]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=plate][data-fit=on-grid]', state: 'visible' } },
  { assert: { selector: '[data-part=block-copy]', state: 'visible' } },
  { assert: { selector: '[data-part=tracks]', state: 'visible' } },
  { wait: 900 },

  // And broken again, with the grid still drawn under it.
  { moveTo: '[data-part=seg-off-grid]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=plate][data-broken]', state: 'visible' } },
  { assert: { selector: '[data-part=tracks]', state: 'visible' } },
  { wait: 700 },
]);
