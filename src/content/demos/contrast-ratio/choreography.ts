import { steps } from '#src/stage/choreography.ts';

export default steps([
  // 4.54:1 at rest: over the body floor, under AAA.
  { assert: { selector: '[data-part=readout][data-level="aa"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-aa][data-pass="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-aaa][data-pass="false"]', state: 'visible' } },
  { wait: 900 },
  // Each swatch is an absolute value, so every band is reached the same way on any pass.
  { moveTo: '[data-part=fg-pale]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-level="none"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-large][data-pass="false"]', state: 'visible' } },
  { wait: 1300 },
  // 3.49:1 clears large text and nothing else, which is the exception drawn out.
  { moveTo: '[data-part=fg-mid]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-level="large"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-large][data-pass="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-aa][data-pass="false"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=fg-ink]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-level="aaa"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-aaa][data-pass="true"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=fg-grey]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-level="aa"]', state: 'visible' } },
  { wait: 1000 },
]);
