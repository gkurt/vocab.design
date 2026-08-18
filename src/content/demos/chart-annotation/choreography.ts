import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The card fades in from mount, so the first reading of the note waits for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=annotation][data-kind=callout]', state: 'visible' } },
  { assert: { selector: '[data-part=note-callout]', state: 'visible' } },
  { assert: { selector: '[data-part=note-reference]', state: 'hidden' } },
  { wait: 700 },

  // A span says something about a stretch of the domain, which a pinned callout cannot.
  { moveTo: '[data-part=seg-span]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=annotation][data-kind=span]', state: 'visible' } },
  { assert: { selector: '[data-part=note-span]', state: 'visible' } },
  { assert: { selector: '[data-part=note-callout]', state: 'hidden' } },
  { wait: 900 },

  // A rule across the plot turns a line of numbers into a judgement.
  { moveTo: '[data-part=seg-reference]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=annotation][data-kind=reference]', state: 'visible' } },
  { assert: { selector: '[data-part=note-reference]', state: 'visible' } },
  { assert: { selector: '[data-part=note-span]', state: 'hidden' } },
  { wait: 900 },

  // Back to the callout, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-callout]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=annotation][data-kind=callout]', state: 'visible' } },
  { assert: { selector: '[data-part=note-callout]', state: 'visible' } },
  { wait: 700 },
]);
