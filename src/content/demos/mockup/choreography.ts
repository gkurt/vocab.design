import { steps } from '#src/stage/choreography.ts';

/**
 * The picture rests in its best state, then the same screen is handed to somebody. Each
 * segment reaches an absolute state rather than flipping one (SPEC §8), and every claim
 * is aimed at a part with a real box and given room after the 200 ms cross-fade, since
 * the judge does not retry. The pass ends back at the mount state, which is the one the
 * subject's `data-pose` accepts.
 */
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=pane][data-state=mockup]', state: 'visible' } },
  { assert: { selector: '[data-part=row-1]', state: 'visible' } },
  { assert: { selector: '[data-part=alert]', state: 'hidden' } },
  { assert: { selector: '[data-part=empty]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-state=mockup]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-hand]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-state=hand]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-long]', state: 'visible' } },
  { assert: { selector: '[data-part=alert]', state: 'visible' } },
  { assert: { selector: '[data-part=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-state=hand]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-mockup]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-state=mockup]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3]', state: 'visible' } },
  { assert: { selector: '[data-part=alert]', state: 'hidden' } },
  { assert: { selector: '[data-part=name][data-long]', state: 'hidden' } },
  { wait: 900 },
]);
