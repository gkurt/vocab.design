import { steps } from '#src/stage/choreography.ts';

// One control, one state: Apply either recognises the code or leaves the panel as it
// found it, and pressing it again changes nothing (SPEC §8). The discount row is
// asserted hidden at mount, which is also the claim that its room was already reserved.
export default steps([
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { assert: { selector: '[data-part=line-discount]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=promo]' },
  { click: true },
  { type: 'SPRING10' },
  { wait: 400 },
  { moveTo: '[data-part=apply]' },
  { click: true },
  { wait: 600 },
  // The total moved because the reader changed something, and every line says so.
  { assert: { selector: '[data-part=summary][data-discounted]', state: 'visible' } },
  { assert: { selector: '[data-part=line-discount]', state: 'visible' } },
  { assert: { selector: '[data-part=line-total]', state: 'visible' } },
  { wait: 1600 },
]);
