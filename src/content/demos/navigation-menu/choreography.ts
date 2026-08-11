import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel-product]', state: 'hidden' } },
  { moveTo: '[data-part=nav-product]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel-product]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-product][aria-expanded="true"]', state: 'visible' } },
  { wait: 1000 },
  // Named absolutely, so the header never ends up with two panels down.
  { moveTo: '[data-part=nav-learn]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=panel-learn]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-product]', state: 'hidden' } },
  { wait: 900 },
  // Opening an item moves you somewhere: the item is a place, not a command.
  { moveTo: '[data-part=link-changelog]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=status][data-page=changelog]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-learn]', state: 'hidden' } },
  { wait: 1000 },
]);
