import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=diff][data-mode=split]', state: 'visible' } },
  // One line gone, one line arrived, one line changed down to a single run.
  { assert: { selector: '[data-part=row-del]', state: 'visible' } },
  { assert: { selector: '[data-part=row-add]', state: 'visible' } },
  { assert: { selector: '[data-part=word]', state: 'visible' } },
  // The blank stretch opposite the addition: alignment padding, drawn rather than left empty.
  { assert: { selector: '[data-part=gap-left]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-right]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=seg-unified]' },
  { click: true },
  { wait: 700 },
  // Interleaved: one column, both versions in it, so nothing needs holding level.
  { assert: { selector: '[data-part=diff][data-mode=unified]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-left]', state: 'hidden' } },
  { assert: { selector: '[data-part=gap-right]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-del]', state: 'visible' } },
  { assert: { selector: '[data-part=row-add]', state: 'visible' } },
  { assert: { selector: '[data-part=word]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-split]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=diff][data-mode=split]', state: 'visible' } },
  { assert: { selector: '[data-part=gap-left]', state: 'visible' } },
  { assert: { selector: '[data-part=word]', state: 'visible' } },
  { wait: 900 },
]);
