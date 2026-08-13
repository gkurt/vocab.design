import { steps } from '#src/stage/choreography.ts';

/**
 * The marking moves with the page, then the hue is taken away and it is still findable.
 * Every pick reaches an absolute page and each segment its own review (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=nav-overview][aria-current="page"]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=nav-invoices]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=nav-invoices][aria-current="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-overview][aria-current="page"]', state: 'hidden' } },
  { assert: { selector: '[data-part=heard][data-page=invoices]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-grey]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=navlist][data-review=grey]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-invoices]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-invoices][aria-current="page"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-members]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=nav-members][aria-current="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-members]', state: 'visible' } },
  { assert: { selector: '[data-part=bar-invoices]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-colour]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=navlist][data-review=colour]', state: 'visible' } },
  { wait: 900 },
]);
