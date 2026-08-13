import { steps } from '#src/stage/choreography.ts';

// The round trip is the claim: a change link goes to one question, and saving comes
// back to the summary with that answer rewritten in place. Every control reaches a
// state rather than flipping one (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=answers]', state: 'visible' } },
  { assert: { selector: '[data-part=row-address][data-value="4 Mill Lane"]', state: 'visible' } },
  { assert: { selector: '[data-part=edit]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=change-address]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=edit][data-question=address]', state: 'visible' } },
  { assert: { selector: '[data-part=answers]', state: 'hidden' } },
  { wait: 400 },
  { moveTo: '[data-part=edit-field]' },
  { click: true },
  { type: ', Unit 3' },
  { wait: 500 },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=answers]', state: 'visible' } },
  { assert: { selector: '[data-part=row-address][data-value="4 Mill Lane, Unit 3"]', state: 'visible' } },
  { assert: { selector: '[data-part=edit]', state: 'hidden' } },
  { wait: 900 },
  // The last gate: nothing was final until this one.
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=answers][data-sent]', state: 'visible' } },
  { wait: 1400 },
]);
