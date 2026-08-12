import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bold][aria-pressed="false"]', state: 'visible' } },
  { moveTo: '[data-part=bold]' },
  { click: true },
  { wait: 400 },
  // The press sticks: the button is still down long after the click that put it there,
  // which is the whole difference from a button that fires and returns.
  { assert: { selector: '[data-part=bold][aria-pressed="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=bold][data-selected]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=bold]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bold][aria-pressed="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=bold][data-selected]', state: 'hidden' } },
  { wait: 800 },
  // The latch is the term, so the script drives both directions itself (SPEC §8).
  { moveTo: '[data-part=bold]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bold][aria-pressed="true"]', state: 'visible' } },
  { wait: 900 },
]);
