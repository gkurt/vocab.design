import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mount is the asymmetric arrangement: unequal blocks that still settle.
  { assert: { selector: '[data-part=composition][data-mode=asymmetric]', state: 'visible' } },
  { assert: { selector: '[data-part=composition][data-balanced]', state: 'visible' } },
  { assert: { selector: '[data-part=scale]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-symmetric]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=seg-symmetric][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=composition][data-mode=symmetric]', state: 'visible' } },
  // Mirroring is one way of balancing, so this state is balanced too.
  { assert: { selector: '[data-part=composition][data-balanced]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-lopsided]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=composition][data-mode=lopsided]', state: 'visible' } },
  // The counter-example: the same three blocks, none of them answering the others.
  { assert: { selector: '[data-part=composition][data-balanced]', state: 'hidden' } },
  { assert: { selector: '[data-part=beam]', state: 'visible' } },
  { wait: 1400 },
  // Each segment names an arrangement, so the way back is an arrangement too.
  { moveTo: '[data-part=seg-asymmetric]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=composition][data-balanced]', state: 'visible' } },
  { wait: 900 },
]);
