import { steps } from '#src/stage/choreography.ts';

// The one place a toggle belongs (SPEC §8): the flip is the term, and the script drives
// every direction itself. Each assert reads the glyph and the announced name together,
// because the claim is that they change in the same instant.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=morph][data-state=paused]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-play]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-pause]', state: 'hidden' } },
  { assert: { selector: '[data-part=name][data-value="Play"]', state: 'visible' } },
  { moveTo: '[data-part=morph]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=morph][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-pause]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-play]', state: 'hidden' } },
  { assert: { selector: '[data-part=name][data-value="Pause"]', state: 'visible' } },
  { wait: 700 },
  { click: true },
  { wait: 500 },
  // Back to the first word, on the same button, in the same place.
  { assert: { selector: '[data-part=morph][data-state=paused]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-value="Play"]', state: 'visible' } },
  { wait: 600 },
  { click: true },
  { wait: 2600 },
  // The track ran out, so the button became the only thing left to want.
  { assert: { selector: '[data-part=morph][data-state=ended]', state: 'visible' } },
  { assert: { selector: '[data-part=glyph-replay]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-value="Replay"]', state: 'visible' } },
  { wait: 1200 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=morph][data-state=playing]', state: 'visible' } },
  { wait: 1200 },
]);
