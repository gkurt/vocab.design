import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=timeline]', state: 'visible' } },
  // Oldest first, and all five on the line at once: the sequence is the component.
  { assert: { selector: '[data-part=entry-1]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-5]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'hidden' } },
  { moveTo: '[data-part=details]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { assert: { selector: '[data-part=details]', state: 'hidden' } },
  // The slot was already the note's size, so the entries under it did not move.
  { assert: { selector: '[data-part=entry-4]', state: 'visible' } },
  { assert: { selector: '[data-part=entry-5]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=note-hide]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=note]', state: 'hidden' } },
  { assert: { selector: '[data-part=details][aria-expanded="false"]', state: 'visible' } },
  { wait: 900 },
]);
