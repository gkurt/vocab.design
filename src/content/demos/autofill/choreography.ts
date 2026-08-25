import { steps } from '#src/stage/choreography.ts';

// The caret goes into one field and the browser's own list opens over the form; one
// choice answers all three at once, so the claim is judged on the two fields nobody
// touched. The pass ends filled, since there is no way back that a browser offers and
// the loop's remount is the reset (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=ua-menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=in-email][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-count="0"]', state: 'visible' } },
  { moveTo: '[data-part=in-name]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=ua-menu][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=profile]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=profile]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=ua-menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=in-email][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=in-postcode][data-state=filled]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-count="3"]', state: 'visible' } },
  { wait: 1800 },
]);
