import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  // Narrowest: one column, and every card is still in the page.
  { assert: { selector: '[data-part=viewport][data-width=phone]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-cols="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { assert: { selector: '[data-part=media]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=seg-tablet]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-tablet][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=viewport][data-width=tablet]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-cols="2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-desktop]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=viewport][data-width=desktop]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-cols="3"]', state: 'visible' } },
  // Same three cards, same picture, one arrangement wider.
  { assert: { selector: '[data-part=card-3]', state: 'visible' } },
  { assert: { selector: '[data-part=media]', state: 'visible' } },
  { wait: 1100 },
  // Each segment names a width, so the way back is a width too, not an undo.
  { moveTo: '[data-part=seg-phone]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-cols="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 800 },
]);
