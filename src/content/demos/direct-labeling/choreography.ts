import { steps } from '#src/stage/choreography.ts';

// The same three lines named two ways, in order. Each state is proved by what carries the
// names: the end labels with the key gone, then the key with the end labels gone, read
// alongside the trip count. The pass returns to the mount state (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=labels]', state: 'visible' } },
  { assert: { selector: '[data-part=key]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=direct]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=mode-legend]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=key]', state: 'visible' } },
  { assert: { selector: '[data-part=labels]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=legend]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=mode-direct]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=labels]', state: 'visible' } },
  { assert: { selector: '[data-part=key]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-mode=direct]', state: 'visible' } },
  { wait: 900 },
]);
