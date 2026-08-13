import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=attachment]', state: 'visible' } },
  { assert: { selector: '[data-part=pending]', state: 'hidden' } },
  { moveTo: '[data-part=attach]' },
  { click: true },
  { wait: 450 },
  // A second file arrives: the same row, reporting a transfer instead of a size.
  { assert: { selector: '[data-part=pending][data-state=uploading]', state: 'visible' } },
  { wait: 1700 },
  { assert: { selector: '[data-part=pending][data-state=done]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=remove]' },
  { wait: 350 },
  { click: true },
  { wait: 450 },
  // Removed, and the row it leaves behind offers the way back.
  { assert: { selector: '[data-part=attachment]', state: 'hidden' } },
  { assert: { selector: '[data-part=undo-row]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=undo]' },
  { wait: 350 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=attachment]', state: 'visible' } },
  { assert: { selector: '[data-part=undo-row]', state: 'hidden' } },
  { wait: 1200 },
]);
