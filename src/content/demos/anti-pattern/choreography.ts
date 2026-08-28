import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window opens already scrolling, and the errand the reader came for is in view.
  { assert: { selector: '[data-part=errand]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=errand]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=add]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { click: true },
  { wait: 700 },
  // Three settlements in, and the switch is under them.
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=errand][data-buried]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=buried]', state: 'visible' } },
  { wait: 500 },
  // Nobody lost an argument, and nobody can turn off the confirmation either.
  { click: true },
  { wait: 1400 },
]);
