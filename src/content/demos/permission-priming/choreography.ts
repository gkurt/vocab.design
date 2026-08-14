import { steps } from '#src/stage/choreography.ts';

// The reason is read before the system is ever asked, and only Turn on reaches it. The
// pass ends back on the asking state the specimen mounts in (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=primer][data-state="asking"]', state: 'visible' } },
  { assert: { selector: '[data-part=os]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=enable]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=os]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=os-allow]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=os]', state: 'hidden' } },
  { assert: { selector: '[data-part=primer][data-state="granted"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=primer][data-state="asking"]', state: 'visible' } },
  { assert: { selector: '[data-part=enable]', state: 'visible' } },
  { wait: 800 },
]);
