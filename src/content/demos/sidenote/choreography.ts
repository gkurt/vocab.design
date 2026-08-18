import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Wide: a real outer margin, with both notes standing beside the lines they annotate.
  { assert: { selector: '[data-part=article][data-layout=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=note-1][data-place=margin]', state: 'visible' } },
  { assert: { selector: '[data-part=note-2][data-place=margin]', state: 'visible' } },
  { wait: 1100 },
  // Narrow: no margin left, so the notes fall back behind their numerals.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=article][data-layout=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=note-1]', state: 'hidden' } },
  { wait: 900 },
  // The numeral is the control now: it reveals its own note in the flow.
  { moveTo: '[data-part=ref-1]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=note-1][data-place=inline]', state: 'visible' } },
  { wait: 1500 },
  // Back to the wide layout, where the same note returns to the margin.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=note-1][data-place=margin]', state: 'visible' } },
  { assert: { selector: '[data-part=note-2][data-place=margin]', state: 'visible' } },
  { wait: 800 },
]);
