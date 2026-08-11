import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-chosen]', state: 'hidden' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  // Press and lift on the card: the whole gesture, and the only one this screen needs.
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-chosen]', state: 'visible' } },
  { assert: { selector: '[data-part=detail]', state: 'visible' } },
  { wait: 1200 },
  // Dismissal is its own control, so a pass picked up anywhere still ends here.
  { moveTo: '[data-part=release]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=detail]', state: 'hidden' } },
  { assert: { selector: '[data-part=card][data-chosen]', state: 'hidden' } },
  { wait: 900 },
]);
