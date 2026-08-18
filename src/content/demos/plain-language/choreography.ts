import { steps } from '#src/stage/choreography.ts';

/**
 * The rewrite is the mount state, which is what `data-pose` on the subject requires (SPEC §6).
 * The pass visits the draft as it arrived, where the countable readout moves with it (one
 * sentence, forty three words, above the level the criterion asks for), and comes back. Each
 * segment reaches its own draft rather than toggling (SPEC §8), and both states are given real
 * reading time rather than a beat.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=prose][data-version=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=level][data-ok=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=sentences][data-version=plain]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-original]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prose][data-version=original]', state: 'visible' } },
  { assert: { selector: '[data-part=level][data-ok=no]', state: 'visible' } },
  { assert: { selector: '[data-part=longest][data-version=original]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-version=original]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=prose][data-version=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=level][data-ok=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-version=plain]', state: 'visible' } },
  { wait: 1100 },
]);
