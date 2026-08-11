import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu-file]', state: 'hidden' } },
  { moveTo: '[data-part=title-file]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=menu-file]', state: 'visible' } },
  { assert: { selector: '[data-part=title-file][aria-expanded="true"]', state: 'visible' } },
  { wait: 800 },
  // The bar is armed now, so the pointer alone moves along the row: no click here.
  { moveTo: '[data-part=title-edit]' },
  { wait: 400 },
  { assert: { selector: '[data-part=menu-edit]', state: 'visible' } },
  { assert: { selector: '[data-part=menu-file]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=item-copy]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=menu-edit]', state: 'hidden' } },
  { assert: { selector: '[data-part=status][data-action=copy]', state: 'visible' } },
  { wait: 900 },
]);
