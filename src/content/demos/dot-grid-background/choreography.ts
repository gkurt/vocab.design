import { steps } from '#src/stage/choreography.ts';

/**
 * The card is dragged at a mark that sits deliberately off the grid, so it lands on the
 * nearest crossing rather than under the pointer, and then the register is picked twice.
 * Each pick brings its own spacing, which the card obeys immediately, so the asserts qualify
 * the board by the register it is currently in rather than only claiming a board is there.
 * The opening wait lets the mount fade finish before the first claim is judged.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=board][data-register=dots]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=card]' },
  { drag: { to: '[data-part=mark-a]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=readout-pos]', state: 'visible' } },
  { moveTo: '[data-part=seg-graph]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-graph][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=board][data-register=graph]', state: 'visible' } },
  { assert: { selector: '[data-part=readout-step]', state: 'visible' } },
  { moveTo: '[data-part=card]' },
  { drag: { to: '[data-part=mark-b]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { moveTo: '[data-part=seg-blueprint]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=board][data-register=blueprint]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-blueprint][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
