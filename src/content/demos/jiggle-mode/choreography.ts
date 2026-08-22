import { steps } from '#src/stage/choreography.ts';

// The mode is entered by the gesture it is really entered by: the `hold` step presses an
// icon and stays down (SPEC §8), so nothing here stands in for the press. Leaving is a
// separate control rather than the same one, so a pass that is resumed or fast-forwarded
// lands in the mode it asked for. The badges are the half of the announcement that
// survives reduced motion, so they are what is asserted.
export default steps([
  { assert: { selector: '[data-part=grid][data-mode=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'hidden' } },
  { moveTo: '[data-part=app-1]' },
  { wait: 450 },
  // A press that lifts straight away opens the app: this is the gesture the hold is told
  // apart from, and the screen stays square.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=grid][data-mode=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'hidden' } },
  { wait: 700 },
  // Held past the threshold, the same press turns the whole field on.
  { hold: 900 },
  { wait: 600 },
  { assert: { selector: '[data-part=grid][data-mode=editing]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-8]', state: 'visible' } },
  { wait: 2400 },
  { moveTo: '[data-part=done]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=grid][data-mode=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=app-1]', state: 'visible' } },
  { wait: 900 },
]);
