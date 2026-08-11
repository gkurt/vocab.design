import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=error]', state: 'hidden' } },
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=error]', state: 'visible' } },
  { assert: { selector: '[data-part=input][aria-invalid="true"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: 'SW1A 1AA' },
  { wait: 600 },
  // The message is the field's verdict, not a banner: submitting again asks for a
  // fresh one, and the corrected value has nothing to complain about.
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=error]', state: 'hidden' } },
  { wait: 900 },
]);
