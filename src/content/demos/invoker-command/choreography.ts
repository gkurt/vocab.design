import { steps } from '#src/stage/choreography.ts';

// The button says what it acts on and what to do to it, so pressing it is the whole
// demonstration; the markup panel gains the dialog's own `open` attribute while it is up.
// Every control reaches one state (SPEC §8): the outer button opens, the inner ones close.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=open-attr]', state: 'hidden' } },
  { moveTo: '[data-part=invoke]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=dialog][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=open-attr]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=keep]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=open-attr]', state: 'hidden' } },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { wait: 800 },
]);
