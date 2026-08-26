import { steps } from '#src/stage/choreography.ts';

/**
 * The layout first, then the same layout with its cell walls drawn. Each segment names
 * an absolute state, so a pass joined halfway is still in a stated one (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=layout][data-scaffold=off]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-columns]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=layout][data-scaffold=on]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-left]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-right]', state: 'visible' } },
  { assert: { selector: '[data-part=legend]', state: 'visible' } },
  { wait: 1900 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=layout][data-scaffold=off]', state: 'visible' } },
  { wait: 900 },
]);
