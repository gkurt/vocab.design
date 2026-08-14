import { steps } from '#src/stage/choreography.ts';

/**
 * The scene plays: the strip speaks in the gaps and waits through the dialogue. Then the
 * extended track takes the same gaps and widens them, which is the mode that stops the
 * picture. Each claim is made mid-slot, never at the edge of one (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=strip][data-state=speaking]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=strip][data-playing]', state: 'visible' } },
  { assert: { selector: '[data-part=strip][data-state=speaking]', state: 'visible' } },
  { wait: 1400 },
  { assert: { selector: '[data-part=strip][data-state=silent]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=strip][data-state=speaking]', state: 'visible' } },
  // The scene runs out after the last line: a terminal state, so this beat only ever
  // has room to spare.
  { wait: 2400 },
  { assert: { selector: '[data-part=strip][data-ended]', state: 'visible' } },
  { moveTo: '[data-part=seg-extended]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=timeline][data-mode=extended]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-ad1][data-mode=extended]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 2100 },
  { assert: { selector: '[data-part=strip][data-state=speaking][data-track=extended]', state: 'visible' } },
  { assert: { selector: '[data-part=timeline][data-paused]', state: 'visible' } },
  { wait: 1200 },
  { assert: { selector: '[data-part=timeline][data-paused]', state: 'hidden' } },
  { wait: 800 },
]);
