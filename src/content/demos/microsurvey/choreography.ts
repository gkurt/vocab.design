import { steps } from '#src/stage/choreography.ts';

// The happy answer, then the page turns and the same question is asked about the new page,
// where the other answer is given. Each click reaches a named state (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=survey][data-state=asking]', state: 'visible' } },
  { assert: { selector: '[data-part=ask]', state: 'visible' } },
  { assert: { selector: '[data-part=thanks]', state: 'hidden' } },
  { wait: 500 },

  { moveTo: '[data-part=answer-yes]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=survey][data-state=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=thanks]', state: 'visible' } },
  { assert: { selector: '[data-part=ask]', state: 'hidden' } },
  { wait: 1400 },

  { moveTo: '[data-part=next-page]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=article][data-page="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=survey][data-state=asking]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=answer-no]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=survey][data-state=no]', state: 'visible' } },
  { assert: { selector: '[data-part=thanks]', state: 'visible' } },
  { wait: 1300 },
]);
