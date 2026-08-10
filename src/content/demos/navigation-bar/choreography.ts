import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-species][aria-current=page]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=nav-habitats]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  // Absolute, not a step along the row: the item clicked is the one that becomes current.
  { assert: { selector: '[data-part=nav-habitats][aria-current=page]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-species][aria-current=page]', state: 'hidden' } },
  { assert: { selector: '[data-part=page-title][data-section=habitats]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=nav-notes]' },
  { wait: 450 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=nav-notes][aria-current=page]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-habitats][aria-current=page]', state: 'hidden' } },
  { assert: { selector: '[data-part=page-title][data-section=notes]', state: 'visible' } },
  // The bar itself does not move or empty out when the destination changes.
  { assert: { selector: '[data-part=wordmark]', state: 'visible' } },
  { assert: { selector: '[data-part=account]', state: 'visible' } },
  { wait: 700 },
]);
