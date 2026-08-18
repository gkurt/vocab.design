import { steps } from '#src/stage/choreography.ts';

// The work first, then the ask, then the same ask moved to the front. Opening and
// dismissing the prompt are separate explicit steps, and each mode segment names an
// absolute state (SPEC §8). The pass returns to the state the specimen mounts in.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=work][data-mode=lazy]', state: 'visible' } },
  { assert: { selector: '[data-part=track-3]', state: 'visible' } },
  { assert: { selector: '[data-part=prompt]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=save]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=prompt]', state: 'visible' } },
  { assert: { selector: '[data-part=carry]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=not-now]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=prompt]', state: 'hidden' } },
  { assert: { selector: '[data-part=track-3]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=mode-upfront]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=gate]', state: 'visible' } },
  { assert: { selector: '[data-part=work][data-mode=upfront]', state: 'visible' } },
  { assert: { selector: '[data-part=tracks]', state: 'hidden' } },
  { wait: 1600 },
  { moveTo: '[data-part=mode-lazy]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=gate]', state: 'hidden' } },
  { assert: { selector: '[data-part=track-3]', state: 'visible' } },
  { wait: 800 },
]);
