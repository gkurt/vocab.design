import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=grid][data-rules=on]', state: 'visible' } },
  { assert: { selector: '[data-part=column-on]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 500 },
  // Without the ruling the two columns look like ordinary text, which is the point:
  // the beat is a measurement, and only one of them is keeping it.
  { assert: { selector: '[data-part=grid][data-rules=off]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=grid][data-rules=on]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=last-off]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=column-off]', state: 'visible' } },
]);
