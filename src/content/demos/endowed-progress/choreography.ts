import { steps } from '#src/stage/choreography.ts';

// The claim is an equality: whatever the segmented buys, the two cards read different
// fractions and the same remainder. Each stop checks all three numbers together, and the
// pass ends on the state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=endowed][data-filled="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=plain][data-filled="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=remaining][data-left="8"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=pick-three]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=endowed][data-filled="5"]', state: 'visible' } },
  { assert: { selector: '[data-part=plain][data-filled="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=remaining][data-left="5"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=pick-six]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=endowed][data-filled="8"]', state: 'visible' } },
  { assert: { selector: '[data-part=plain][data-filled="6"]', state: 'visible' } },
  { assert: { selector: '[data-part=remaining][data-left="2"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=pick-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=endowed][data-filled="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=remaining][data-left="8"]', state: 'visible' } },
  { wait: 900 },
]);
