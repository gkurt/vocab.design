import { steps } from '#src/stage/choreography.ts';

/**
 * The same four expressions against three different origins. Each segment names its seed
 * outright, so a pass joined halfway is still in a stated state (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=rows][data-seed=indigo]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-wash]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-teal]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=rows][data-seed=teal]', state: 'visible' } },
  { assert: { selector: '[data-part=row-hover]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-crimson]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=rows][data-seed=crimson]', state: 'visible' } },
  { assert: { selector: '[data-part=swatch-disabled]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=rows][data-seed=indigo]', state: 'visible' } },
  { wait: 900 },
]);
