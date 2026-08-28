import { steps } from '#src/stage/choreography.ts';

/**
 * The drawing rests and the legend names its shorthand one convention at a time. Each
 * segment reaches an absolute state rather than flipping one (SPEC §8), and every claim
 * is aimed at a part that carries a real box: the crossed box itself rather than the
 * hairlines drawn across it (the stage reads a box thinner than about 2px as absent).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=drawing]', state: 'visible' } },
  { assert: { selector: '[data-part=image-box]', state: 'visible' } },
  { assert: { selector: '[data-part=block-card-1][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=legend][data-convention=block]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-image]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=image-box][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=legend][data-convention=image]', state: 'visible' } },
  { assert: { selector: '[data-part=block-card-1][data-marked]', state: 'hidden' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-text]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=text-heading][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=text-line-2][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=legend][data-convention=text]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=seg-block]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=block-logo][data-marked]', state: 'visible' } },
  { assert: { selector: '[data-part=legend-label][data-convention=block]', state: 'visible' } },
  { assert: { selector: '[data-part=footnote]', state: 'visible' } },
  { wait: 800 },
]);
