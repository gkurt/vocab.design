import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=like][data-phase=inert]', state: 'visible' } },
  { moveTo: '[data-part=like]' },
  // The press that lands before the pass: the button is painted, and it answers nothing.
  { click: true },
  { assert: { selector: '[data-part=readout][data-state=dead]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-count="18"]', state: 'visible' } },
  { wait: 2300 },
  { assert: { selector: '[data-part=like][data-phase=live]', state: 'visible' } },
  // The same press, on the other side of the pass.
  { moveTo: '[data-part=like]' },
  { click: true },
  { assert: { selector: '[data-part=readout][data-state=applied]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-count="19"]', state: 'visible' } },
  { wait: 900 },
]);
