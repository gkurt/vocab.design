import { steps } from '#src/stage/choreography.ts';

/**
 * The truthful announcement first, since the specimen rests on the declared counts, then the
 * same row with the attributes taken away, where the reader can only count the render window.
 * An arrow press in each state proves the position advances by the same one row and lands on a
 * different number. Each segment reaches an absolute state rather than toggling one (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=count][data-mode=declared]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=utterance][data-state=spoken]', state: 'visible' } },
  { moveTo: '[data-part=list]' },
  { wait: 500 },

  { press: 'ArrowDown' },
  { wait: 800 },
  { assert: { selector: '[data-part=row-3][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][aria-posinset="248"]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-mode=declared]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-omitted]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=count][data-mode=omitted]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=omitted]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][aria-posinset="248"]', state: 'hidden' } },
  { wait: 1200 },

  { moveTo: '[data-part=list]' },
  { press: 'ArrowDown' },
  { wait: 800 },
  { assert: { selector: '[data-part=row-4][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-mode=omitted]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-declared]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=count][data-mode=declared]', state: 'visible' } },
  { assert: { selector: '[data-part=row-4][aria-posinset="249"]', state: 'visible' } },
  { wait: 1200 },
]);
