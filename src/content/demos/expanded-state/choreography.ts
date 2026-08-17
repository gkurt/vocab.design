import { steps } from '#src/stage/choreography.ts';

/**
 * The specimen rests with one surface open and one closed, so both values are on screen from
 * the start. Close the disclosure, open the menu beside it, choose a command, and open the
 * disclosure again: both directions are driven by the script, which is what makes a toggling
 * trigger legal here, because the flip is the term (SPEC §8). Every claim is made on a
 * trigger's own `aria-expanded`, so nothing depends on evidence inside a surface a click has
 * just closed.
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=trigger-disclosure][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=val-disclosure][data-value=true]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=trigger-menu][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=trigger-disclosure]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=trigger-disclosure][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=val-disclosure][data-value=false]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=trigger-menu]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=trigger-menu][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=val-menu][data-value=true]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  // The two states are independent: opening one surface says nothing about the other.
  { assert: { selector: '[data-part=trigger-disclosure][aria-expanded="false"]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=menu-duplicate]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=trigger-menu][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=trigger-disclosure]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=trigger-disclosure][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { wait: 900 },
]);
