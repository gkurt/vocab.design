import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=stack][data-op=over]', state: 'visible' } },
  { assert: { selector: '[data-part=src]', state: 'visible' } },
  { assert: { selector: '[data-part=stencil]', state: 'hidden' } },
  { assert: { selector: '[data-part=board]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-atop]' },
  { click: true },
  { wait: 650 },
  // Atop keeps the source only inside the backdrop, so the free-standing circle goes.
  { assert: { selector: '[data-part=stack][data-op=atop]', state: 'visible' } },
  { assert: { selector: '[data-part=clip]', state: 'visible' } },
  { assert: { selector: '[data-part=src]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-out]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=stack][data-op=out]', state: 'visible' } },
  { assert: { selector: '[data-part=stencil]', state: 'visible' } },
  { assert: { selector: '[data-part=clip]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-over]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=stack][data-op=over]', state: 'visible' } },
  { assert: { selector: '[data-part=op-name]', state: 'visible' } },
  { wait: 900 },
]);
