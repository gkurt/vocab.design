import { steps } from '#src/stage/choreography.ts';

// One timer, three channels, in order. Each channel is proved twice: the strip names it,
// and the task surface reads the same ten minutes running afterwards, stamped with a new
// source. The state assert is repeated after every channel because agreeing about state is
// the whole term. Nothing here asserts the unset card, since a looping pass finds the timer
// already set and that claim would be true only on the first run (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=channel-name][data-mode=touch]', state: 'visible' } },
  { moveTo: '[data-part=tap-preset]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=task][data-timer="10-running"]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=touch]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=pick-voice]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=channel-name][data-mode=voice]', state: 'visible' } },
  { assert: { selector: '[data-part=transcript]', state: 'hidden' } },
  { moveTo: '[data-part=speak]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=transcript]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=task][data-timer="10-running"]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=voice]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=pick-gaze]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=channel-name][data-mode=gaze]', state: 'visible' } },
  { assert: { selector: '[data-part=gaze-target]', state: 'visible' } },
  { moveTo: '[data-part=pinch]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=task][data-timer="10-running"]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=gaze]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=pick-touch]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=channel-name][data-mode=touch]', state: 'visible' } },
  { wait: 700 },
]);
