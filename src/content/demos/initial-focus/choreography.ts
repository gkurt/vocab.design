import { steps } from '#src/stage/choreography.ts';

/**
 * The good landing, the dangerous one, the container, and back. Each segment reaches an
 * absolute landing (SPEC §8) and the ring is simulated throughout (SPEC §7).
 */
export default steps([
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-delete]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=delete][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=verdict][data-case=delete]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-dialog]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dialog][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=delete][data-sim-focus]', state: 'hidden' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-field]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-case=field]', state: 'visible' } },
  { wait: 1000 },
]);
