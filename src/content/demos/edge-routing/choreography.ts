import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mounted as a curve, the routing most node editors default to.
  { assert: { selector: '[data-part=edge][data-routing=bezier]', state: 'visible' } },
  { assert: { selector: '[data-part=label][data-place=mid]', state: 'visible' } },
  { wait: 800 },
  // The staircase is the one routing that can be sent around the box in the way, and the
  // one whose label has to leave the middle of the path.
  { moveTo: '[data-part=seg-step]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=edge][data-routing=step]', state: 'visible' } },
  { assert: { selector: '[data-part=label][data-place=leg]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-straight]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=edge][data-routing=straight]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-straight][data-selected]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-bezier]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=edge][data-routing=bezier]', state: 'visible' } },
  { assert: { selector: '[data-part=label][data-place=mid]', state: 'visible' } },
  { wait: 800 },
]);
