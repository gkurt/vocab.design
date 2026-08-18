import { steps } from '#src/stage/choreography.ts';

/**
 * The same two keys pressed in both modes. In browse mode Down walks the reader's own copy
 * of the page and H skips two nodes to the next heading; in focus mode Down is handed
 * through and H becomes a letter in the field. Each segment reaches its own mode and the
 * walk clamps at the last node (SPEC §8), and the pass ends in browse mode, which is the
 * state the region is the term in.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=page][data-mode=browse]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=did][data-did=rest]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=page]' },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=node-p1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=did][data-did=moved]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'hidden' } },
  { wait: 500 },

  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=node-link][data-sim-focus]', state: 'visible' } },
  { wait: 600 },

  // One letter, and the cursor skips the field entirely to reach the next heading.
  { press: 'h' },
  { wait: 600 },
  { assert: { selector: '[data-part=node-h2][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=did][data-did=jumped]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-typed=none]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-focus]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-mode=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h2][data-sim-focus]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=page]' },
  { press: 'h' },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-typed=h]', state: 'visible' } },
  { assert: { selector: '[data-part=did][data-did=typed]', state: 'visible' } },
  { wait: 700 },

  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=did][data-did=passed]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-browse]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-mode=browse]', state: 'visible' } },
  { assert: { selector: '[data-part=node-h1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-typed=none]', state: 'visible' } },
  { wait: 900 },
]);
