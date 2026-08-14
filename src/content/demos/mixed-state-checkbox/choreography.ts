import { steps } from '#src/stage/choreography.ts';

/**
 * A child changes and the parent stays mixed, then the parent's own cycle: mixed to all,
 * all to none, and back to mixed the only way mixed is ever reached, from a child. The
 * toggle is the term here, which is the case SPEC §8 sanctions one for.
 */
export default steps([
  { assert: { selector: '[data-part=parent][aria-checked=mixed]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=mixed]', state: 'visible' } },
  { moveTo: '[data-part=child-icons]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=child-icons][aria-checked=true]', state: 'visible' } },
  { assert: { selector: '[data-part=parent][aria-checked=mixed]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=parent]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=parent][aria-checked=true]', state: 'visible' } },
  { assert: { selector: '[data-part=child-type][aria-checked=true]', state: 'visible' } },
  { wait: 900 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=parent][aria-checked=false]', state: 'visible' } },
  { assert: { selector: '[data-part=child-tokens][aria-checked=false]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=child-tokens]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=parent][aria-checked=mixed]', state: 'visible' } },
  { wait: 900 },
]);
