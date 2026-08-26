import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=gutter]', state: 'visible' } },
  // Every line labelled, the first and the last included.
  { assert: { selector: '[data-part=cell-1]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-8]', state: 'visible' } },
  { assert: { selector: '[data-part=detail][data-commit=gk]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=cell-3]' },
  { wait: 500 },
  // One line points at its commit, and the commit answers with every line it touched.
  { assert: { selector: '[data-part=detail][data-commit=mm]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-3][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-4][data-active]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=cell-8]' },
  { wait: 500 },
  // The oldest change in the file wrote its first line and its last.
  { assert: { selector: '[data-part=detail][data-commit=rl]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-1][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-8][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-3][data-active]', state: 'hidden' } },
  { wait: 1300 },
]);
