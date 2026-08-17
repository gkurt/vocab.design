import { steps } from '#src/stage/choreography.ts';

// The run starts at mount, so the script opens after both legs have landed. Each segment
// names a mode and Replay names a run, so neither step flips whatever it finds (SPEC §8).
export default steps([
  { wait: 1700 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { assert: { selector: '[data-part=box][data-blur=on]', state: 'visible' } },
  { assert: { selector: '[data-part=still][data-blur=on]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Out and back takes about 1.3 seconds, so the post-click beat lands well inside the crossing.
  { assert: { selector: '[data-part=scene][data-state=crossing]', state: 'visible' } },
  { wait: 1700 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  // The counter-example: the same crossing with nothing smeared.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=box][data-blur=off]', state: 'visible' } },
  { assert: { selector: '[data-part=still][data-blur=off]', state: 'visible' } },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { assert: { selector: '[data-part=scene][data-state=crossing]', state: 'visible' } },
  { wait: 1700 },
  { assert: { selector: '[data-part=scene][data-state=rested]', state: 'visible' } },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=box][data-blur=on]', state: 'visible' } },
  { wait: 700 },
]);
