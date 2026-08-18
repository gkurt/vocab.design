import { steps } from '#src/stage/choreography.ts';

/**
 * One cell, three ways of writing what it belongs to. The pass starts on `scope`, where the
 * cell is tied to its own column and row, moves to `id` and `headers`, where the spanning
 * quarter joins the announcement, then drops the association entirely so the same cell says
 * only “42”, and returns to where it began. Each segment names its own state absolutely
 * (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=written][data-value=scope]', state: 'visible' } },
  { assert: { selector: '[data-part=cell][data-linked]', state: 'visible' } },
  { assert: { selector: '[data-part=h-rev3][data-tied]', state: 'visible' } },
  { assert: { selector: '[data-part=h-q3][data-tied]', state: 'hidden' } },
  { assert: { selector: '[data-part=says][data-written=scope]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-headers]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=written][data-value=headers]', state: 'visible' } },
  { assert: { selector: '[data-part=cell][data-written=headers]', state: 'visible' } },
  { assert: { selector: '[data-part=h-q3][data-tied]', state: 'visible' } },
  { assert: { selector: '[data-part=r-nw][data-tied]', state: 'visible' } },
  { assert: { selector: '[data-part=says][data-written=headers]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=written][data-value=none]', state: 'visible' } },
  { assert: { selector: '[data-part=cell][data-linked]', state: 'hidden' } },
  { assert: { selector: '[data-part=h-rev3][data-tied]', state: 'hidden' } },
  { assert: { selector: '[data-part=says][data-written=none]', state: 'visible' } },
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-scope]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=written][data-value=scope]', state: 'visible' } },
  { assert: { selector: '[data-part=cell][data-linked]', state: 'visible' } },
  { assert: { selector: '[data-part=h-rev3][data-tied]', state: 'visible' } },
  { wait: 900 },
]);
