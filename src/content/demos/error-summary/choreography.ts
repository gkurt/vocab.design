import { steps } from '#src/stage/choreography.ts';

// Submit answers the form, the summary reports it, an entry takes the reader to the
// field, and a second submit clears it. The summary belongs to submit, never to typing.
export default steps([
  { assert: { selector: '[data-part=summary]', state: 'hidden' } },
  { moveTo: '[data-part=submit]' },
  { wait: 300 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-name]', state: 'visible' } },
  { assert: { selector: '[data-part=msg-email]', state: 'visible' } },
  { wait: 700 },
  // Each entry is a way into the field that caused it.
  { moveTo: '[data-part=link-email]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=input-email][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=input-name]' },
  { type: 'Priya Rana' },
  { wait: 400 },
  { moveTo: '[data-part=input-email]' },
  { type: '@example.com' },
  { wait: 400 },
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=summary]', state: 'hidden' } },
  { assert: { selector: '[data-part=msg-email]', state: 'hidden' } },
  { assert: { selector: '[data-part=success]', state: 'visible' } },
  { wait: 1000 },
]);
