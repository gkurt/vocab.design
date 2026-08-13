import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The grid is the whole vocabulary and it is there from mount, so the pose needs no summon.
  { assert: { selector: '[data-part=grid]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-name="tomato"]', state: 'visible' } },
  { wait: 800 },
  // Every cell names one keyword, so a click reaches a stated value rather than flipping one.
  { moveTo: '[data-part=cell-rebeccapurple]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-name="rebeccapurple"]', state: 'visible' } },
  { assert: { selector: '[data-part=cell-rebeccapurple][data-picked]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=cell-cornflowerblue]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-name="cornflowerblue"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=cell-papayawhip]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-name="papayawhip"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=cell-tomato]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-name="tomato"]', state: 'visible' } },
  { wait: 800 },
]);
