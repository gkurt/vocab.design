import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the drawn box waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=box][data-mode=boxed][data-drawn]', state: 'visible' } },
  { assert: { selector: '[data-part=box-title]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { wait: 600 },

  // Spacing only: the same three controls, with nothing drawn around them.
  { moveTo: '[data-part=seg-bare]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-mode=bare]', state: 'visible' } },
  { assert: { selector: '[data-part=box-title]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-2]', state: 'visible' } },
  { wait: 800 },

  // Over-boxed: a border per control, and the grouping the border was for is gone.
  { moveTo: '[data-part=seg-nested]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-mode=nested][data-drawn]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1][data-nested]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][data-nested]', state: 'visible' } },
  { wait: 800 },

  // Back to one box, which is the state the box is actually a box in.
  { moveTo: '[data-part=seg-boxed]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=box][data-mode=boxed][data-drawn]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { wait: 700 },
]);
