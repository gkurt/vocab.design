import { steps } from '#src/stage/choreography.ts';

// Every step lands on an absolute state: a named line for the caret, fold to collapse,
// the collapsed row's own badge to expand (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=pane]', state: 'visible' } },
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=row-5]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pos][data-line="5"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=row-8]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pos][data-line="8"]', state: 'visible' } },
  { wait: 800 },
  // The gutter arrow knows where the body ends: three lines leave together.
  { moveTo: '[data-part=fold]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=block]', state: 'hidden' } },
  { assert: { selector: '[data-part=unfold]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=unfold]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=block]', state: 'visible' } },
  { assert: { selector: '[data-part=unfold]', state: 'hidden' } },
  { wait: 900 },
]);
