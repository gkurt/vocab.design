import { steps } from '#src/stage/choreography.ts';

export default steps([
  { moveTo: '[data-part=copy]' },
  { wait: 500 },
  { assert: { selector: '[data-part=copy-done]', state: 'hidden' } },
  { click: true },
  { wait: 500 },
  // A control with no text has to confirm in the only place it has: the glyph.
  { assert: { selector: '[data-part=copy-done]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=copied]', state: 'visible' } },
  // Long enough after the swap back that the claim is not timed to its edge.
  { wait: 1800 },
  { assert: { selector: '[data-part=copy-done]', state: 'hidden' } },
  { moveTo: '[data-part=share]' },
  { click: true },
  { wait: 500 },
  // The labelled button next to it does the same kind of work, and spends the room to say so.
  { assert: { selector: '[data-part=status][data-state=shared]', state: 'visible' } },
]);
