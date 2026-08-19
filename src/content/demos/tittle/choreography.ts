import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=glyph][data-letter=i]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-dotted]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the letter it reaches.
  { moveTo: '[data-part=seg-j]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glyph][data-letter=j]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-dotted]', state: 'visible' } },
  { moveTo: '[data-part=seg-dotless]' },
  { click: true },
  { wait: 800 },
  // The dotless letter has no tittle to box, which is the point of showing it.
  { assert: { selector: '[data-part=glyph][data-letter=dotless]', state: 'visible' } },
  { assert: { selector: '[data-part=marker]', state: 'hidden' } },
  { moveTo: '[data-part=seg-capital]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glyph][data-letter=capital]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-dotted]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  // Ends on the letter the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-i]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=glyph][data-letter=i]', state: 'visible' } },
  { assert: { selector: '[data-part=marker][data-dotted]', state: 'visible' } },
  { wait: 700 },
]);
