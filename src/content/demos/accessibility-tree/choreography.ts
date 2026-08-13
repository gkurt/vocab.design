import { steps } from '#src/stage/choreography.ts';

/**
 * The state arrives in the tree, then two nodes are traced back to their elements. Each
 * pick reaches an absolute node rather than flipping the previous one (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=node-checkbox][data-state=unchecked]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=ui-checkbox]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ui-checkbox][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-checkbox][data-state=checked]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=node-heading]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=node-heading][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=ui-heading][data-linked]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=node-button]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ui-save][data-linked]', state: 'visible' } },
  { assert: { selector: '[data-part=ui-heading][data-linked]', state: 'hidden' } },
  { wait: 1100 },
]);
