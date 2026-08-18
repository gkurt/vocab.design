import { steps } from '#src/stage/choreography.ts';

/**
 * Strip the traits and the chip keeps every pixel it had while the announcement loses the
 * word that made it a control; put the state trait on and the announcement finally carries
 * what the chip is drawn as. The subject's own `data-traits` is the proof: it is simply
 * absent in the no-traits state. Each segment reaches its own set (SPEC §8), and the pass
 * ends on a state the subject is the term in.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=panel][data-mode=button]', state: 'visible' } },
  { assert: { selector: '[data-part=control][data-traits]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-mode=button]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=control][data-traits]', state: 'hidden' } },
  { assert: { selector: '[data-part=say][data-mode=none]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=none]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-selected]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel][data-mode=selected]', state: 'visible' } },
  { assert: { selector: '[data-part=control][data-traits]', state: 'visible' } },
  { assert: { selector: '[data-part=say][data-mode=selected]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=seg-button]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel][data-mode=button]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=button]', state: 'visible' } },
  { wait: 900 },
]);
