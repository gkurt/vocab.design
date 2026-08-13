import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Both schemes are the function working, so the mount state already shows the term.
  { assert: { selector: '[data-part=card][data-scheme="light"]', state: 'visible' } },
  { assert: { selector: '[data-part=code]', state: 'visible' } },
  { wait: 900 },
  // Each segment declares one scheme outright; the card is repainted by the browser, not by the demo.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-scheme="dark"]', state: 'visible' } },
  { assert: { selector: '[data-part=arg-surface-dark]', state: 'visible' } },
  { wait: 1600 },
  // Back to the mount state, so a loop starts where the last pass left off.
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=card][data-scheme="light"]', state: 'visible' } },
  { wait: 900 },
]);
