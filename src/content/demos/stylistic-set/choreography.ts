import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=run][data-ss=on]', state: 'visible' } },
  // The four the set redraws, each claimed on its own: the group is the term.
  { assert: { selector: '[data-part=cell-shr]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-shl]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-or]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-pipe]', state: 'visible' } },
  // Absolute picks, never a flip: the segments are the two values the feature takes.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=run][data-ss=off]', state: 'visible' } },
  // The operators the set never touches are there in both states.
  { assert: { selector: '[data-part=cell-eq]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-noteq]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends with the set applied, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=run][data-ss=on]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-or]', state: 'visible' } },
  { wait: 700 },
]);
