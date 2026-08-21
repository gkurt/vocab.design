import { steps } from '#src/stage/choreography.ts';

// The teaching screen first: a preview of the filled board, the line that explains
// it, and the control that starts a real one. Then the real board, which is what
// makes the preview a preview.
export default steps([
  { wait: 420 },
  { assert: { selector: '[data-part=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=start]', state: 'visible' } },
  { assert: { selector: '[data-part=board]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=start]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=zero]', state: 'hidden' } },
  { wait: 900 },
]);
