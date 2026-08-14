import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card-em]', state: 'visible' } },
  { assert: { selector: '[data-part=card-px]', state: 'visible' } },
  { wait: 700 },
  // The pick is an absolute size, never a toggle: the script drives it to 20 and
  // back to 14, so a pass joined halfway still lands on a stated state.
  { moveTo: '[data-part=seg-20]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-em][data-size="20"]', state: 'visible' } },
  { moveTo: '[data-part=trace]' },
  { wait: 900 },
  { assert: { selector: '[data-part=trace]', state: 'visible' } },
  { moveTo: '[data-part=seg-14]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-em][data-size="14"]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
