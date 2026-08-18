import { steps } from '#src/stage/choreography.ts';

// Two claims, in order. First that the page did not end where it looked like it did: the
// scroller is driven past the band and `data-at` records that there was somewhere to go,
// then returned to the top it mounted at. Then that the repair is a shorter band plus a
// cue, reached by an absolute pick rather than a flip (SPEC §8). The pass ends on the false
// bottom, which is the state the specimen mounts in and the one its `data-pose` names.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-mode=false]', state: 'visible' } },
  { assert: { selector: '[data-part=continue]', state: 'hidden' } },
  { assert: { selector: '[data-part=page][data-at=top]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { wait: 500 },
  { scroll: { y: 120 } },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-at=below]', state: 'visible' } },
  { assert: { selector: '[data-part=more-title]', state: 'visible' } },
  { wait: 1200 },
  { scroll: { y: -120 } },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-at=top]', state: 'visible' } },
  { moveTo: '[data-part=pick-fixed]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-mode=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=continue]', state: 'visible' } },
  { assert: { selector: '[data-part=more-title]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=pick-false]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-mode=false]', state: 'visible' } },
  { assert: { selector: '[data-part=continue]', state: 'hidden' } },
  { wait: 900 },
]);
