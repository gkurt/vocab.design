import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=button][data-state="raised"]', state: 'visible' } },
  { assert: { selector: '[data-part=dial]', state: 'visible' } },
  { moveTo: '[data-part=button]' },
  { click: true },
  // The only state change the style has: both shadows move inside the control.
  { assert: { selector: '[data-part=button][data-state="pressed"]', state: 'visible' } },
  { wait: 1300 },
  { assert: { selector: '[data-part=button][data-state="raised"]', state: 'visible' } },
  { assert: { selector: '[data-part=switch]', state: 'visible' } },
  { wait: 900 },
]);
