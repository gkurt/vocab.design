import { steps } from '#src/stage/choreography.ts';

/**
 * One button, one spoken command, two accessible names. The compliant name is the mount
 * state, which is what `data-pose` on the subject requires (SPEC §6); the pass visits the
 * mismatch, shows the command going nowhere, and comes back. Each segment reaches its own
 * naming rather than toggling (SPEC §8).
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=send][data-name=contains]', state: 'visible' } },
  { assert: { selector: '[data-part=send][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=contains][data-ok=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=answer][data-ok=yes]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-replaces]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=send][data-name=replaces]', state: 'visible' } },
  { assert: { selector: '[data-part=send][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=contains][data-ok=no]', state: 'visible' } },
  { assert: { selector: '[data-part=answer][data-ok=no]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-contains]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=send][data-name=contains]', state: 'visible' } },
  { assert: { selector: '[data-part=send][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=answer][data-ok=yes]', state: 'visible' } },
  { wait: 900 },
]);
