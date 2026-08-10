import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=share]' },
  { wait: 700 },
  { assert: { selector: '[data-part=tooltip][data-for=share]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=trash]' },
  { wait: 700 },
  // The label follows the pointer, and at the frame's edge it shifts rather than clips.
  { assert: { selector: '[data-part=tooltip][data-for=trash]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=page]' },
  { wait: 400 },
  { assert: { selector: '[data-part=tooltip]', state: 'hidden' } },
]);
