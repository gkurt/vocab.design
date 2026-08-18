import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  // Mount is the widest gap: a 1x phone beside a 3x one, drawing the same 48 dp button.
  { assert: { selector: '[data-part=phone-a][data-density="1x"]', state: 'visible' } },
  { assert: { selector: '[data-part=phone-b][data-density="3x"]', state: 'visible' } },
  { assert: { selector: '[data-part=button-b]', state: 'visible' } },
  { assert: { selector: '[data-part=px-b]', state: 'visible' } },
  { wait: 1000 },
  // At 1x the two phones are the same device, which is where the unit is defined.
  { moveTo: '[data-part=seg-1x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-1x][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=phone-b][data-density="1x"]', state: 'visible' } },
  { assert: { selector: '[data-part=button-b]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-2x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-2x][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=phone-b][data-density="2x"]', state: 'visible' } },
  // The left phone never moves, and neither button ever changes size.
  { assert: { selector: '[data-part=phone-a][data-density="1x"]', state: 'visible' } },
  { assert: { selector: '[data-part=button-a]', state: 'visible' } },
  { wait: 1200 },
  // Each segment names a bucket, so the way back is a bucket too, not an undo.
  { moveTo: '[data-part=seg-3x]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-3x][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=phone-b][data-density="3x"]', state: 'visible' } },
  { assert: { selector: '[data-part=button-b]', state: 'visible' } },
  { wait: 1000 },
]);
