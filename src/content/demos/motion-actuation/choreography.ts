import { steps } from '#src/stage/choreography.ts';

/**
 * The two things 2.5.4 asks for, exercised in turn: the plain control performs the same undo, and
 * the switch turns the motion trigger off. The shake itself is never performed, because the player
 * has no device motion to send and a control that impersonated one would be a lie (SPEC §8). The
 * switch is driven in both directions by the script, since turning the trigger off and on again is
 * the half of the criterion under test, and each segment reaches an absolute configuration.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=undo]', state: 'visible' } },
  { assert: { selector: '[data-part=off-switch][data-checked]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-state=edited]', state: 'visible' } },
  { wait: 500 },

  { moveTo: '[data-part=undo]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=note][data-state=restored]', state: 'visible' } },
  { assert: { selector: '[data-part=source][data-by=button]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=off-switch]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=motion][data-state=off]', state: 'visible' } },
  { assert: { selector: '[data-part=off-switch][data-checked]', state: 'hidden' } },
  { wait: 1100 },

  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=motion][data-state=on]', state: 'visible' } },
  { assert: { selector: '[data-part=off-switch][data-checked]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-motion]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=undo]', state: 'hidden' } },
  { assert: { selector: '[data-part=off-switch]', state: 'hidden' } },
  { assert: { selector: '[data-part=off-card]', state: 'hidden' } },
  { assert: { selector: '[data-part=caption][data-mode=motion]', state: 'visible' } },
  { wait: 2000 },

  { moveTo: '[data-part=seg-ok]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=undo]', state: 'visible' } },
  { assert: { selector: '[data-part=off-switch][data-checked]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=ok]', state: 'visible' } },
  { wait: 900 },
]);
