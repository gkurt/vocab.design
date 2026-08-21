import { steps } from '#src/stage/choreography.ts';

// A drawn poster answers no pointer: the line is the claim and it is all at rest,
// so the pass names the ornament in asserts rather than in cursor moves.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=frame]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=flower]', state: 'visible' } },
  { assert: { selector: '[data-part=stems]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=leaves]', state: 'visible' } },
  { assert: { selector: '[data-part=foot]', state: 'visible' } },
  { wait: 1300 },
]);
