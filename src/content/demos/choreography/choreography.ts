import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The pass the specimen plays on mount, run out to the end.
  { wait: 1500 },
  { assert: { selector: '[data-part=group][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=card-notes][data-arrived]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // One instant, part way through the plan: the cards that lead are already here and the
  // ones that follow are not. That gap is the term.
  { assert: { selector: '[data-part=card-total][data-arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=card-notes][data-arrived]', state: 'hidden' } },
  { assert: { selector: '[data-part=group][data-state=playing]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=card-notes][data-arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=group][data-state=settled]', state: 'visible' } },
  { wait: 700 },
]);
