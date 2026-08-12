import { steps } from '#src/stage/choreography.ts';

/**
 * The reader's own keys, never Tab: the demo owns the virtual cursor, so the stage's
 * simulated focus stays where it was and nothing here moves real focus (SPEC §7).
 */
export default steps([
  { assert: { selector: '[data-part=voice][data-state=heading]', state: 'visible' } },
  { assert: { selector: '[data-part=item-heading][data-sim-focus]', state: 'visible' } },
  { wait: 700 },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=voice][data-state=link]', state: 'visible' } },
  { assert: { selector: '[data-part=item-link][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=voice][data-state=checkbox]', state: 'visible' } },
  { wait: 700 },
  // Enter activates whatever the cursor is on, and the state comes back out in speech.
  { press: 'Enter' },
  { wait: 600 },
  { assert: { selector: '[data-part=item-insurance][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state=checked]', state: 'visible' } },
  { wait: 800 },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=voice][data-state=button]', state: 'visible' } },
  { wait: 900 },
]);
