import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=line][data-complete=yes][data-count="26"]', state: 'visible' } },
  // The tally is walked from the line itself, so these cells are struck by the text.
  { assert: { selector: '[data-part=tally-z][data-used=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=tally-q][data-used=yes]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the line it sets.
  { moveTo: '[data-part=seg-near]' },
  { click: true },
  { wait: 800 },
  // One word shorter, and four letters never occur: no longer a pangram.
  { assert: { selector: '[data-part=line][data-complete=no][data-count="22"]', state: 'visible' } },
  { assert: { selector: '[data-part=tally-z][data-used=no]', state: 'visible' } },
  { assert: { selector: '[data-part=tally-q][data-used=yes]', state: 'visible' } },
  { moveTo: '[data-part=seg-jugs]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-complete=yes][data-count="26"]', state: 'visible' } },
  { assert: { selector: '[data-part=tally-z][data-used=yes]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends on a complete line, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-fox]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=line][data-complete=yes][data-count="26"]', state: 'visible' } },
  { wait: 700 },
]);
