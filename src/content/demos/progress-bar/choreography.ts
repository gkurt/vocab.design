import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=fill]', state: 'hidden' } },
  { moveTo: '[data-part=upload]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-state=running]', state: 'visible' } },
  { assert: { selector: '[data-part=fill]', state: 'visible' } },
  // The run reaches its last reading 2520 ms after the press; the claim is made well
  // clear of it, and clear of the fill's own 300 ms transition into place.
  { wait: 2600 },
  { assert: { selector: '[data-part=bar][data-state=done]', state: 'visible' } },
  { wait: 700 },
]);
