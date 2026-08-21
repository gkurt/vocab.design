import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=frame]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=osd]', state: 'visible' } },
  // The picture answers no pointer, so nothing tours it: the wait is reading time
  // for the fringe, the flecks, and the burned-in overlay.
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp]', state: 'visible' } },
  { wait: 1500 },
  // Send the band down the frame once. It rests where it started, so the specimen is
  // the same picture before and after (SPEC §8).
  { moveTo: '[data-part=roll]' },
  { click: true },
  { wait: 1800 },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { assert: { selector: '[data-part=stamp]', state: 'visible' } },
  { wait: 700 },
]);
