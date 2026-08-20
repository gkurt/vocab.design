import { steps } from '#src/stage/choreography.ts';

/**
 * The same announcement twice in each mode. The direct call speaks on both presses; the live
 * region speaks once and then writes the same text into the same node, which is no mutation and
 * no speech. Each segment reaches an absolute state and resets the scene (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=dom][data-mode=notify]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=call][data-fired=no]', state: 'visible' } },
  { wait: 400 },

  { moveTo: '[data-part=copy]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=line-1][data-kind=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=call][data-fired=yes]', state: 'visible' } },
  { wait: 700 },

  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=line-2][data-kind=spoken]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-region]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dom][data-mode=region]', state: 'visible' } },
  { assert: { selector: '[data-part=node][data-text=no]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=copy]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=node][data-text=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1][data-kind=spoken]', state: 'visible' } },
  { wait: 700 },

  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=line-2][data-kind=silent]', state: 'visible' } },
  { assert: { selector: '[data-part=line-2][data-kind=spoken]', state: 'hidden' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-notify]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=dom][data-mode=notify]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },
  { wait: 700 },
]);
