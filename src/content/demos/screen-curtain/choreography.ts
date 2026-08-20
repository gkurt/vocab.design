import { steps } from '#src/stage/choreography.ts';

/**
 * The same three presses twice: once with the display on, once with it switched off. Each segment
 * reaches an absolute state and replays the walk from its start (SPEC §8), and the transcript lines
 * are cumulative, so a claim on one means the walk really got there.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=curtain]', state: 'hidden' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
  { wait: 300 },

  { moveTo: '[data-part=screen]' },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=ctl-1][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'visible' } },
  { press: 'ArrowRight' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=line-3]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-3][data-sim-focus]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=curtain]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=on]', state: 'visible' } },
  { wait: 500 },

  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=line-1]', state: 'visible' } },
  { press: 'ArrowRight' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=line-3]', state: 'visible' } },
  { assert: { selector: '[data-part=curtain]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=curtain]', state: 'hidden' } },
  { assert: { selector: '[data-part=line-3]', state: 'hidden' } },
  { wait: 800 },
]);
