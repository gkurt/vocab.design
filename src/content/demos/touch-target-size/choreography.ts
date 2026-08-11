import { steps } from '#src/stage/choreography.ts';

/** Favouriting always favourites, and each segment names the state it lands in. */
export default steps([
  { moveTo: '[data-part=target-big]' },
  { click: true },
  { assert: { selector: '[data-part=target-big][data-selected]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=target-small]' },
  { click: true },
  { assert: { selector: '[data-part=target-small][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-glyph]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=zone-big][data-mode=glyph]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-target]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=zone-big][data-mode=target]', state: 'visible' } },
  { wait: 1200 },
]);
