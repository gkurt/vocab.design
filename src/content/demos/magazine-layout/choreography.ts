import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The page fades in from mount, so the first reading of the ranking waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=lead][data-rank=lead]', state: 'visible' } },
  { assert: { selector: '[data-part=picture-lead]', state: 'visible' } },
  { assert: { selector: '[data-part=brief-3]', state: 'visible' } },
  { wait: 600 },

  // Flattened: the same six items at one size, and the lead stops being one.
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=lead][data-rank=equal]', state: 'visible' } },
  { assert: { selector: '[data-part=picture-brief-1]', state: 'visible' } },
  { wait: 800 },

  // Ranked again: the lead takes back its area and its headline.
  { moveTo: '[data-part=seg-ranked]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=lead][data-rank=lead]', state: 'visible' } },
  { assert: { selector: '[data-part=picture-brief-1]', state: 'hidden' } },
  { wait: 700 },
]);
