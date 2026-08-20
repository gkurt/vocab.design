import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the window to land.
  { wait: 700 },
  { assert: { selector: '[data-part=popup]', state: 'hidden' } },
  { assert: { selector: '[data-part=path][data-depth="0"]', state: 'visible' } },
  { wait: 400 },

  // Pressing the field opens the tree: a branch, its children, and a sibling branch, all at once.
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=popup]', state: 'visible' } },
  { assert: { selector: '[data-part=node-marketing][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-campaigns]', state: 'visible' } },
  { assert: { selector: '[data-part=node-engineering][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-runbooks]', state: 'hidden' } },
  { wait: 700 },

  // The twisty expands a second branch, and the first one stays open beside it: the whole
  // hierarchy is on screen, not one level of it.
  { moveTo: '[data-part=twisty-engineering]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=node-runbooks]', state: 'visible' } },
  { assert: { selector: '[data-part=node-campaigns]', state: 'visible' } },
  { assert: { selector: '[data-part=node-engineering][aria-expanded="true"]', state: 'visible' } },
  { wait: 800 },

  // The row selects, which is why a parent can be the answer: Campaigns is chosen with its own
  // children still collapsed under it. The popup closes, so the evidence is the field's readout.
  { moveTo: '[data-part=node-campaigns]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=popup]', state: 'hidden' } },
  { assert: { selector: '[data-part=path][data-value=campaigns]', state: 'visible' } },
  { assert: { selector: '[data-part=path][data-depth="2"]', state: 'visible' } },
  { wait: 900 },

  // Reopening restores the tree with the committed branch selected rather than collapsed to roots.
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=node-campaigns][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-runbooks]', state: 'visible' } },
  { wait: 900 },
]);
