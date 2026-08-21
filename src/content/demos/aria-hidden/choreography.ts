import { steps } from '#src/stage/choreography.ts';

/**
 * The ornament is on screen and absent from the readout, then the attribute is turned off
 * and its node arrives between the heading and the byline, then it is turned back on. Each
 * segment reaches its own value rather than toggling (SPEC §8), and the pass ends where it
 * started, at the state the ornament is the term in.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=ornament][aria-hidden="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-title]', state: 'visible' } },
  { assert: { selector: '[data-part=node-ornament]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-false]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ornament][aria-hidden="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-ornament]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=false]', state: 'visible' } },
  { wait: 1100 },

  { moveTo: '[data-part=seg-true]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ornament][aria-hidden="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-ornament]', state: 'hidden' } },
  { wait: 900 },
]);
