import { steps } from '#src/stage/choreography.ts';

/**
 * The line as it usually ships (small, faded, after the button), then the same line
 * given the four P's, then back. Each segment reaches its own treatment rather than
 * toggling (SPEC §8), and the slot flags prove the line really travelled rather than
 * merely changing size.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=qualifier][data-set=standard]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-foot][data-filled]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-conspicuous]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=qualifier][data-set=conspicuous]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-near][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-set=conspicuous]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-standard]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=qualifier][data-set=standard]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-foot][data-filled]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-set=standard]', state: 'visible' } },
  { wait: 1100 },
]);
