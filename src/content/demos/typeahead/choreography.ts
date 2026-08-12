import { steps } from '#src/stage/choreography.ts';

// Typing opens the list, the keyboard moves the active option, Enter takes it. Nothing
// here toggles: the list is opened by the query and dismissed by the choice (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=suggestions]', state: 'hidden' } },
  { moveTo: '[data-part=query]' },
  { wait: 300 },
  { type: 'ma' },
  { wait: 450 },
  { assert: { selector: '[data-part=suggestions]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-manchester]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-maidstone]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-dover]', state: 'hidden' } },
  // The first match is active the moment the query lands, without a key being pressed.
  { assert: { selector: '[data-part=opt-manchester][aria-selected="true"]', state: 'visible' } },
  { wait: 500 },
  { press: 'ArrowDown' },
  { wait: 350 },
  { assert: { selector: '[data-part=opt-margate][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-manchester][aria-selected="true"]', state: 'hidden' } },
  { wait: 400 },
  { press: 'Enter' },
  { wait: 400 },
  { assert: { selector: '[data-part=suggestions]', state: 'hidden' } },
  { assert: { selector: '[data-part=result][data-chosen="margate"]', state: 'visible' } },
  { wait: 1000 },
]);
