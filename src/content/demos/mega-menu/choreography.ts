import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { moveTo: '[data-part=nav-products]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-products][aria-expanded="true"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=link-warehouse]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-page=warehouse]', state: 'visible' } },
  { wait: 700 },
  // The other dismissal, driven to the same absolute states: the trigger opens, and
  // Escape is what closes (SPEC §8).
  { moveTo: '[data-part=nav-products]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { press: 'Escape' },
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 900 },
]);
