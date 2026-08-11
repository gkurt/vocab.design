import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=field][data-at=end]', state: 'visible' } },
  { moveTo: '[data-part=field]' },
  { wait: 400 },
  // Pressing inside the text puts the insertion point at the gap nearest the press.
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=field][data-at=middle]', state: 'visible' } },
  { wait: 700 },
  // Keys move it too, and Home is an absolute destination rather than a step.
  { press: 'Home' },
  { wait: 400 },
  { assert: { selector: '[data-part=field][data-at=start]', state: 'visible' } },
  { wait: 500 },
  { press: '0' },
  { press: '1' },
  { press: '-' },
  { wait: 400 },
  // Typing went in where the caret was, not at the end of the value.
  { assert: { selector: '[data-part=field][data-at=middle]', state: 'visible' } },
  { wait: 700 },
  { press: 'End' },
  { wait: 400 },
  { assert: { selector: '[data-part=field][data-at=end]', state: 'visible' } },
  { wait: 1000 },
]);
