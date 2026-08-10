import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 420 },
  // The action acted in place: the card is saved and still on its shelf.
  { assert: { selector: '[data-part=save][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { wait: 600 },
  { moveTo: '[data-part=card-media]' },
  { click: true },
  { wait: 520 },
  // The surface as a whole led somewhere.
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=shelf]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 700 },
]);
