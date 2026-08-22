import { steps } from '#src/stage/choreography.ts';

/**
 * Two strokes over the same 90 px, differing only in the release. The first settles before
 * it lifts, so the recognizer reads no speed and the list stops with the contact. The second
 * lifts while still travelling, and covering that distance in 200 ms hands over about
 * 450 px/s, comfortably past the throw threshold, so the surface spends it on its own.
 * Each stroke is bracketed by a reset, so every pass measures from the same place and a pass
 * joined halfway still reaches the state it names rather than flipping what it found.
 */
export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  // A contact that comes to a stop before it lets go, which is what this term is not about.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-end]' } },
  { wait: 400 },
  { assert: { selector: '[data-part=surface][data-carry=none]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  { wait: 500 },
  // The throw: the same stroke, released mid-motion and quick enough to carry.
  { moveTo: '[data-part=grip]' },
  { wait: 500 },
  { drag: { to: '[data-part=grip-end]', release: 'moving', ms: 200 } },
  { assert: { selector: '[data-part=surface][data-carry=coasting]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=surface][data-carry=settled]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=reset]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=surface][data-carry=idle]', state: 'visible' } },
  { wait: 800 },
]);
