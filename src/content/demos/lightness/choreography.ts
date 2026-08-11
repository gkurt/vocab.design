import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ramp][data-lightness="55"]', state: 'visible' } },
  { moveTo: '[data-part=stop-90]' },
  { click: true },
  // Same hue, same chroma: the only thing that moved is how light it reads.
  { assert: { selector: '[data-part=ramp][data-lightness="90"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-90][data-selected]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-22]' },
  { click: true },
  { assert: { selector: '[data-part=ramp][data-lightness="22"]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=stop-55]' },
  { click: true },
  { assert: { selector: '[data-part=ramp][data-lightness="55"]', state: 'visible' } },
  { wait: 1200 },
]);
