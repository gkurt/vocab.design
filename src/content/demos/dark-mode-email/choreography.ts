import { steps } from '#src/stage/choreography.ts';

/**
 * Each segment names a client behaviour outright, so a pass joined halfway is still
 * in a stated state (SPEC §8). The claims are the measured ones: which of the two
 * marks and which of the two copy colours are still readable after the repaint.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=inverted][data-mode=partial][data-mark=lost][data-copy=lost]', state: 'visible' } },
  { assert: { selector: '[data-part=inverted-plated]', state: 'visible' } },
  { assert: { selector: '[data-part=authored]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=inverted][data-mode=full][data-mark=lost][data-copy=kept]', state: 'visible' } },
  { assert: { selector: '[data-part=inverted-bare]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-partial]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=inverted][data-mode=partial][data-copy=lost]', state: 'visible' } },
  { wait: 900 },
]);
