import { steps } from '#src/stage/choreography.ts';

// A click anchors the cell outright, and the arrows that follow move from the cell
// that click just named, so every claim below is an absolute reference (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=cell-a1][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=editor]', state: 'hidden' } },
  { wait: 400 },
  { moveTo: '[data-part=cell-b2]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=cell-b2][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=ref][data-cell=B2]', state: 'visible' } },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 450 },
  { assert: { selector: '[data-part=cell-c2][data-active]', state: 'visible' } },
  { press: 'ArrowDown' },
  { wait: 450 },
  { assert: { selector: '[data-part=cell-c3][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=ref][data-cell=C3]', state: 'visible' } },
  { wait: 600 },
  // Enter opens the focused cell; the editor is laid over it, so nothing shifts.
  { press: 'Enter' },
  { wait: 450 },
  { assert: { selector: '[data-part=editor]', state: 'visible' } },
  { assert: { selector: '[data-part=mode][data-value=editing]', state: 'visible' } },
  { moveTo: '[data-part=editor]' },
  { type: '2450' },
  { wait: 400 },
  { press: 'Enter' },
  { wait: 500 },
  { assert: { selector: '[data-part=cell-c3][data-value="2450"]', state: 'visible' } },
  { assert: { selector: '[data-part=editor]', state: 'hidden' } },
  { assert: { selector: '[data-part=mode][data-value=ready]', state: 'visible' } },
  { wait: 900 },
]);
