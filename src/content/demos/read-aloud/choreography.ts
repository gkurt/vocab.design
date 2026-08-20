import { steps } from '#src/stage/choreography.ts';

/**
 * Silence, then one reading from the first word to the last. The demo reads nothing on mount, so
 * this press owns the only run (SPEC §8). Claims about progress are aimed at the words already
 * read, which is cumulative state, rather than at the readout, which names the current word alone.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=readout][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=highlight]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=highlight]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-state=speaking]', state: 'visible' } },
  { assert: { selector: '[data-part=word-1][data-read]', state: 'visible' } },
  { assert: { selector: '[data-part=word-21][data-read]', state: 'hidden' } },

  { wait: 2400 },
  { assert: { selector: '[data-part=word-8][data-read]', state: 'visible' } },
  { assert: { selector: '[data-part=highlight]', state: 'visible' } },

  { wait: 3800 },
  { assert: { selector: '[data-part=readout][data-state=done]', state: 'visible' } },
  { assert: { selector: '[data-part=word-21][data-read]', state: 'visible' } },
  { assert: { selector: '[data-part=highlight]', state: 'hidden' } },
  { wait: 800 },
]);
