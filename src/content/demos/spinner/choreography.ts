import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=spinner]', state: 'hidden' } },
  { moveTo: '[data-part=load]' },
  { wait: 300 },
  { click: true },
  // Load-bearing: the glyph only exists inside the wait, which is what identify's
  // summon polls for when it goes looking for the subject.
  { wait: 500 },
  { assert: { selector: '[data-part=spinner]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][aria-busy="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=result]', state: 'hidden' } },
  // Past the resolve, with room: the judge does not retry.
  { wait: 1900 },
  { assert: { selector: '[data-part=result]', state: 'visible' } },
  { assert: { selector: '[data-part=panel][aria-busy="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=spinner]', state: 'hidden' } },
  { wait: 1000 },
]);
