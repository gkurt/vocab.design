import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=badge][data-count="9"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot]', state: 'visible' } },
  // The count changes because the host's state changed, never because the marker was
  // pressed: a badge takes no input at all.
  { moveTo: '[data-part=arrive]' },
  { wait: 300 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=badge][data-count="10"]', state: 'visible' } },
  { assert: { selector: '[data-part=badge][data-count="9"]', state: 'hidden' } },
  { assert: { selector: '[data-part=inbox]', state: 'visible' } },
  { wait: 1100 },
]);
