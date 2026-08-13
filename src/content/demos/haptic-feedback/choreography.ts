import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Between events there is nothing to feel, so there is nothing to draw.
  { assert: { selector: '[data-part=tick]', state: 'hidden' } },
  { moveTo: '[data-part=add]' },
  { wait: 500 },
  { click: true },
  { assert: { selector: '[data-part=tick][data-kind=impact]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=tick]', state: 'hidden' } },
  // A drag across the notches: one tick per detent crossed, ending on an absolute notch.
  { moveTo: '[data-part=thumb]' },
  { wait: 400 },
  { drag: { to: '[data-part=detent-3]' } },
  { assert: { selector: '[data-part=tick][data-kind=selection]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=tick]', state: 'hidden' } },
  { moveTo: '[data-part=save]' },
  { wait: 400 },
  { click: true },
  { assert: { selector: '[data-part=tick][data-kind=success]', state: 'visible' } },
  { wait: 1300 },
]);
