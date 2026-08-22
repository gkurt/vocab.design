import { steps } from '#src/stage/choreography.ts';

/**
 * The same three presses twice, once with the display on and once with it switched off, and the
 * switch is the gesture VoiceOver really uses: three contacts, tapped three times, on the screen.
 * One gesture reaches each named state (`[data-part=screen][data-curtain=…]`) and replays the walk
 * from its start (SPEC §8), and the transcript lines are cumulative, so a claim on one means the
 * walk really got there.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=screen][data-curtain=off]', state: 'visible' } },
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

  // Three fingers, tapped three times: the display goes off, and nothing else does.
  { tap: { fingers: 3, count: 3 } },
  { wait: 900 },
  { assert: { selector: '[data-part=screen][data-curtain=on]', state: 'visible' } },
  { assert: { selector: '[data-part=curtain]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=on]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
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
  { wait: 1400 },

  // The same gesture again, because the same gesture is what takes the display back.
  { tap: { fingers: 3, count: 3 } },
  { wait: 900 },
  { assert: { selector: '[data-part=screen][data-curtain=off]', state: 'visible' } },
  { assert: { selector: '[data-part=curtain]', state: 'hidden' } },
  { assert: { selector: '[data-part=line-3]', state: 'hidden' } },
  { wait: 800 },
]);
