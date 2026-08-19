import { steps } from '#src/stage/choreography.ts';

/**
 * A gate change under each setting, with a beat after each press for the polite queue to get
 * its turn. Every press moves the gate on to a new value rather than toggling one back and
 * forth (SPEC §8), so a pass joined halfway proves the same thing.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=region][data-atomic=true]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=change]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-mode=whole]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=seg-false]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=region][data-atomic=false]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=change]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-mode=fragment]', state: 'visible' } },
  { wait: 1700 },

  { moveTo: '[data-part=seg-true]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=region][data-atomic=true]', state: 'visible' } },
  { moveTo: '[data-part=change]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=heard][data-mode=whole]', state: 'visible' } },
  { assert: { selector: '[data-part=heard][data-state=spoken]', state: 'visible' } },
  { wait: 1200 },
]);
