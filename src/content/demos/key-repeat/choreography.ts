import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=track][data-index="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-phase=idle]', state: 'visible' } },
  // One press, one step: a tap moves the caret exactly once.
  { moveTo: '[data-part=track]' },
  { wait: 400 },
  { press: 'ArrowRight' },
  { wait: 400 },
  { assert: { selector: '[data-part=track][data-index="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-ran]', state: 'hidden' } },
  { wait: 600 },
  // The hold. A synthesized press cannot be held down (SPEC §7), so the run is armed
  // through a labelled control: one fire, the initial delay, then the repeat rate.
  { moveTo: '[data-part=hold]' },
  { wait: 300 },
  { click: true },
  { wait: 1200 },
  { assert: { selector: '[data-part=track][data-phase=repeating]', state: 'visible' } },
  { assert: { selector: '[data-part=track][data-ran]', state: 'visible' } },
  { wait: 900 },
  // Letting go stops it, whether the caret ran to the end first or not.
  { moveTo: '[data-part=release]' },
  { wait: 300 },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=track][data-phase=idle]', state: 'visible' } },
  { wait: 1000 },
]);
