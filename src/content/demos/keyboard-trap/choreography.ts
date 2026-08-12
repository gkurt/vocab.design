import { steps } from '#src/stage/choreography.ts';

/**
 * One lap of the trap, then the same plug-in with an exit. The ring is the demo's own, so
 * Tab here moves a specimen's cursor and never the stage's simulated focus (SPEC §7).
 */
export default steps([
  { assert: { selector: '[data-part=widget][data-mode=trapped]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-home][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-leave]', state: 'hidden' } },
  { wait: 550 },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-zoom-in][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-zoom-out][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-reset][data-sim-focus]', state: 'visible' } },
  { press: 'Tab' },
  { wait: 600 },
  // Round again, and Continue below the plug-in has still never been reached.
  { assert: { selector: '[data-part=stop-zoom-in][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-continue][data-sim-focus]', state: 'hidden' } },
  { wait: 500 },
  { press: 'Escape' },
  { wait: 550 },
  { assert: { selector: '[data-part=stop-zoom-in][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=mode-escapable]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=widget][data-mode=escapable]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-leave]', state: 'visible' } },
  { wait: 600 },
  { press: 'Escape' },
  { wait: 550 },
  { assert: { selector: '[data-part=stop-continue][data-sim-focus]', state: 'visible' } },
  { wait: 500 },
  { press: 'Tab' },
  { wait: 500 },
  { assert: { selector: '[data-part=stop-help][data-sim-focus]', state: 'visible' } },
  { wait: 900 },
]);
