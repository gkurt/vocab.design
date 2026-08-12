import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-scale="1"]', state: 'visible' } },
  { moveTo: '[data-part=stop-2]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-scale="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=gesture][data-direction=open]', state: 'visible' } },
  { wait: 700 },
  // Every factor is an absolute state, so a pass picked up part-way still lands here.
  { moveTo: '[data-part=stop-4]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-scale="4"]', state: 'visible' } },
  { wait: 1000 },
  // The way back is the other half of the same gesture, named as such.
  { moveTo: '[data-part=stop-1]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-scale="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=gesture][data-direction=closed]', state: 'visible' } },
  { wait: 900 },
]);
