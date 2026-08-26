import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Two rows, one control between them, and neither action taken yet.
  { assert: { selector: '[data-part=star-button]', state: 'visible' } },
  { assert: { selector: '[data-part=row-hidden]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-advertised]', state: 'hidden' } },
  { assert: { selector: '[data-part=badge-hidden]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=star-button]' },
  { click: true },
  { wait: 600 },
  // The advertised path: one tap on a control that said what it would do.
  { assert: { selector: '[data-part=row-advertised][data-starred]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-advertised]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-hidden]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=row-hidden]' },
  // A press held past a threshold nothing on screen mentions reaches the same action.
  { hold: 750 },
  { wait: 600 },
  { assert: { selector: '[data-part=row-hidden][data-starred]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-hidden]', state: 'visible' } },
  { wait: 1300 },
]);
