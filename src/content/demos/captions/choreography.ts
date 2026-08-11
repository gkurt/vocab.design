import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar][data-captions=on]', state: 'visible' } },
  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=bar][data-playing]', state: 'visible' } },
  // Four cues at 1.3s each, then the track is out: a terminal state, so the beat
  // before this claim only ever has room to spare.
  { wait: 5200 },
  { assert: { selector: '[data-part=bar][data-ended]', state: 'visible' } },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-captions=off]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=bar][data-captions=on]', state: 'visible' } },
  { wait: 700 },
]);
