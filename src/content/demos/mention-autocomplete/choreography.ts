import { steps } from '#src/stage/choreography.ts';

// The list is opened by the trigger and dismissed by the choice, so nothing here
// flips a state it found (SPEC §8). Characters land one at a time, which is what
// makes the filter demonstrable: the menu opens on `@` and narrows on `ma`.
export default steps([
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=token]', state: 'hidden' } },
  { moveTo: '[data-part=editor]' },
  { click: true },
  { wait: 300 },
  { type: '@' },
  { wait: 450 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-mara]', state: 'visible' } },
  { wait: 400 },
  { type: 'ma' },
  { wait: 500 },
  // Every match is a word starting with the query, which is why Priya Raman drops out.
  { assert: { selector: '[data-part=opt-mara]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-maya]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-priya]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-tom]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-mara][aria-selected="true"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=opt-mara]' },
  { click: true },
  { wait: 500 },
  // The typed letters are gone and an identity is standing in their place.
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=token][data-who=mara]', state: 'visible' } },
  { assert: { selector: '[data-part=mention][data-mentioned=mara]', state: 'visible' } },
  { wait: 1400 },
]);
