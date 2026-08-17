import { steps } from '#src/stage/choreography.ts';

// The gated row is in the list from the first frame; selecting it explains the plan, and
// Not now puts the explanation away without changing anything else. The closed state is
// read off the row itself, since the panel it names is gone by then (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=gate]', state: 'visible' } },
  { assert: { selector: '[data-part=plan-badge]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=gate]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=gate][data-open="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-title]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=not-now]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=gate][data-open="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 800 },
]);
