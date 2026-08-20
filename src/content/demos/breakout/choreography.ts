import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the tracks waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-tracks=three]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-fit=between]', state: 'visible' } },
  { assert: { selector: '[data-part=prose-1]', state: 'visible' } },
  { assert: { selector: '[data-part=full-strip]', state: 'visible' } },
  { wait: 600 },

  // A narrow page has nowhere to put the middle track, so it clamps onto the full one.
  { moveTo: '[data-part=seg-tight]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=page][data-tracks=two]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-fit=full]', state: 'visible' } },
  { assert: { selector: '[data-part=prose-2]', state: 'visible' } },
  { wait: 800 },

  // Room again, and the figure goes back to sitting between the column and the page edge.
  { moveTo: '[data-part=seg-roomy]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=page][data-tracks=three]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-fit=between]', state: 'visible' } },
  { wait: 700 },
]);
