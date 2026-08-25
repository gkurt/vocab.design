import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=worklist][data-mode=transparent]', state: 'visible' } },
  { moveTo: '[data-part=search]' },
  { click: true },
  { assert: { selector: '[data-part=worklist][data-state=running]', state: 'visible' } },
  { wait: 1100 },
  // Mid-stream: the work already done is named, the work still queued is not.
  { assert: { selector: '[data-part=src-1][data-state=done]', state: 'visible' } },
  { assert: { selector: '[data-part=src-4][data-state=pending]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=result]', state: 'visible' } },
  { wait: 700 },
  // The same wait, spent in silence.
  { moveTo: '[data-part=seg-silent]' },
  { click: true },
  { assert: { selector: '[data-part=mode][data-value=silent]', state: 'visible' } },
  { moveTo: '[data-part=search]' },
  { click: true },
  { assert: { selector: '[data-part=silent-wait]', state: 'visible' } },
  { assert: { selector: '[data-part=result]', state: 'hidden' } },
  { wait: 2600 },
  { assert: { selector: '[data-part=result]', state: 'visible' } },
  { wait: 800 },
]);
