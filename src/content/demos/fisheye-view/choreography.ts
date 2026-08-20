import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the column waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=row-6][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=lens][data-zone=top]', state: 'visible' } },
  // The far end of the list is a sliver, and a sliver is still on screen.
  { assert: { selector: '[data-part=row-30]', state: 'visible' } },
  { assert: { selector: '[data-part=falloff]', state: 'visible' } },
  { wait: 600 },

  // The lens is dragged down the column, and the whole distortion travels with it.
  { moveTo: '[data-part=at-6]' },
  { drag: { to: '[data-part=at-24]', via: ['[data-part=at-14]'] } },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-zone=bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=row-24][data-state=focus]', state: 'visible' } },
  // The row that was legible a moment ago is now part of the falloff above the lens.
  { assert: { selector: '[data-part=row-6][data-state=far]', state: 'visible' } },
  { assert: { selector: '[data-part=falloff]', state: 'visible' } },
  { wait: 800 },

  // Back up the column, through the middle, which is where both falloffs are longest.
  { moveTo: '[data-part=at-24]' },
  { drag: { to: '[data-part=at-6]', via: ['[data-part=at-16]'] } },
  { wait: 700 },
  { assert: { selector: '[data-part=lens][data-zone=top]', state: 'visible' } },
  { assert: { selector: '[data-part=row-6][data-state=focus]', state: 'visible' } },
  { assert: { selector: '[data-part=row-24][data-state=far]', state: 'visible' } },
  { wait: 700 },
]);
