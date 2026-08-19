import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=subset][data-ships=latin]', state: 'visible' } },
  { assert: { selector: '[data-part=row-basic][data-lit=on]', state: 'visible' } },
  { assert: { selector: '[data-part=row-cyrillic][data-lit=off]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the amount of the face it ships.
  { moveTo: '[data-part=seg-used]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=subset][data-ships=used]', state: 'visible' } },
  { assert: { selector: '[data-part=row-lat-ext][data-lit=off]', state: 'visible' } },
  { assert: { selector: '[data-part=row-basic][data-lit=on]', state: 'visible' } },
  { moveTo: '[data-part=range]' },
  { wait: 700 },
  { assert: { selector: '[data-part=size]', state: 'visible' } },
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 800 },
  // Shipping everything is not a subset, which is what the subject's data-pose says.
  { assert: { selector: '[data-part=row-cyrillic][data-lit=on]', state: 'visible' } },
  { assert: { selector: '[data-part=subset][data-subset]', state: 'hidden' } },
  // Ends on the pick the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-latin]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=subset][data-ships=latin]', state: 'visible' } },
  { assert: { selector: '[data-part=row-greek][data-lit=off]', state: 'visible' } },
  { wait: 700 },
]);
