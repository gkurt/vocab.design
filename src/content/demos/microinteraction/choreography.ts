import { steps } from '#src/stage/choreography.ts';

// The like flips, and the flip is what the loop produces, so the script drives both
// directions itself rather than leaving the second press to whatever state it finds
// (SPEC §8). Every assert is read off durable state the loop wrote, never off a chip
// that is still lighting.
export default steps([
  { assert: { selector: '[data-part=like][data-liked]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-value="127"]', state: 'visible' } },
  { moveTo: '[data-part=like]' },
  { wait: 400 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=like][data-liked]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-value="128"]', state: 'visible' } },
  { assert: { selector: '[data-part=step-loops][data-lit]', state: 'visible' } },
  { wait: 1400 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=like][data-liked]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-value="127"]', state: 'visible' } },
  { wait: 1100 },
]);
