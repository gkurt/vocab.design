import { steps } from '#src/stage/choreography.ts';

// Nothing runs until the press, so the script owns the only run (SPEC §8). Then the same wait
// happens twice over: on the left a spinner that will say exactly this much at second twenty,
// on the right four named units of work, each keeping its result once it lands.
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=run][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=summary]', state: 'hidden' } },
  { moveTo: '[data-part=search]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=run][data-state=running]', state: 'visible' } },
  { assert: { selector: '[data-part=step-fares][data-done]', state: 'visible' } },
  { assert: { selector: '[data-part=step-seats][data-done]', state: 'hidden' } },
  { wait: 2600 },
  { assert: { selector: '[data-part=run][data-state=done]', state: 'visible' } },
  { assert: { selector: '[data-part=step-seats][data-done]', state: 'visible' } },
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { wait: 1000 },
]);
