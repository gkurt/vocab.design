import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The grid is on stage from mount, so a pass picked up anywhere starts on the convention.
  { wait: 460 },
  { assert: { selector: '[data-part=canvas][data-backing="checker"]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'visible' } },
  { assert: { selector: '[data-part=art]', state: 'visible' } },
  { assert: { selector: '[data-part=plain]', state: 'hidden' } },
  { wait: 1200 },

  // Plain white: the same artwork, and now the empty regions are indistinguishable from paint.
  { moveTo: '[data-part=seg-white]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=canvas][data-backing="white"]', state: 'visible' } },
  { assert: { selector: '[data-part=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'hidden' } },
  { assert: { selector: '[data-part=art]', state: 'visible' } },
  { wait: 1400 },

  // The destination page settles the question the white backing could not answer.
  { moveTo: '[data-part=seg-page]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=canvas][data-backing="page"]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'hidden' } },
  { assert: { selector: '[data-part=plain]', state: 'hidden' } },
  { wait: 1400 },

  // Back to the grid, the only state where the term is on the canvas.
  { moveTo: '[data-part=seg-checker]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=canvas][data-backing="checker"]', state: 'visible' } },
  { assert: { selector: '[data-part=checker]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'hidden' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },
  { wait: 1300 },
]);
