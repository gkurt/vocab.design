import { steps } from '#src/stage/choreography.ts';

/**
 * Two cursors, one screen. The pass walks the review cursor off the Send button and down onto
 * two lines no tab stop ever visits, with the focus ring holding still in the To field the
 * whole way. Then it hands the Step button to the system focus, which moves while the review
 * cursor stays exactly where it was left. Picking a cursor returns both to where they started,
 * so the pass ends in the state it began in (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=drives][data-value=review]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at=n-send]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=step]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=marker][data-at=n-status]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=reads][data-node=n-status]', state: 'visible' } },
  { wait: 700 },

  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=marker][data-at=n-note]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=n-note][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=focus-at][data-node=n-to]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-focus]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=drives][data-value=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at=n-send]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=step]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=n-body][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=marker][data-at=n-send]', state: 'visible' } },
  { assert: { selector: '[data-part=focus-at][data-node=n-body]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-review]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=drives][data-value=review]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-at=n-send]', state: 'visible' } },
  { assert: { selector: '[data-part=n-to][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
