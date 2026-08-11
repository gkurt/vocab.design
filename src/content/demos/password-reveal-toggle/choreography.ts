import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=input][type=password]', state: 'visible' } },
  { moveTo: '[data-part=toggle]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=toggle][aria-pressed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=input][type=text]', state: 'visible' } },
  { wait: 1600 },
  // The flip is the term, so the script drives it back itself rather than leaving
  // the specimen in whichever state a pass happened to end on (SPEC §8).
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=toggle][aria-pressed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=input][type=password]', state: 'visible' } },
  { wait: 900 },
]);
