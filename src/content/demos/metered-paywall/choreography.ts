import { steps } from '#src/stage/choreography.ts';

// The count is spent one article at a time and the wall arrives only when it reaches
// zero, which is the whole difference between a meter and a block. The pass ends on the
// state the specimen mounts in, restored by the labelled Reset (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-left="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=read-next]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-left="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=meter-bar][data-zone="warn"]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'hidden' } },
  { wait: 800 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=meter][data-left="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'hidden' } },
  { wait: 800 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=wall]', state: 'visible' } },
  { assert: { selector: '[data-part=wall-title]', state: 'visible' } },
  { assert: { selector: '[data-part=meter][data-left="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=read-next][aria-disabled="true"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=reset]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=meter][data-left="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=wall]', state: 'hidden' } },
  { wait: 900 },
]);
