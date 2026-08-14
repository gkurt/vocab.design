import { steps } from '#src/stage/choreography.ts';

/**
 * The arrows move the reference, the typing proves focus never left the field, and Enter
 * takes the option the field was pointing at. The list is opened by the demo's resting
 * state and dismissed by the choice, so nothing here toggles (SPEC §8). The claim after
 * Enter is made on the readout, which stays on screen once the list has closed.
 */
export default steps([
  { assert: { selector: '[data-part=option-0][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-active=bath]', state: 'visible' } },
  { moveTo: '[data-part=input]' },
  { wait: 400 },
  { press: 'ArrowDown' },
  { wait: 400 },
  { assert: { selector: '[data-part=option-1][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=option-0][data-active]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-active=bristol]', state: 'visible' } },
  { wait: 500 },
  { press: 'ArrowDown' },
  { wait: 400 },
  { assert: { selector: '[data-part=readout][data-active=birmingham]', state: 'visible' } },
  { wait: 500 },
  // Typing keeps working because the field never gave up focus, which is the whole
  // reason the pattern exists.
  { type: 'man' },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-active=manchester]', state: 'visible' } },
  { assert: { selector: '[data-part=option-0]', state: 'hidden' } },
  { wait: 500 },
  { press: 'Enter' },
  { wait: 500 },
  { assert: { selector: '[data-part=listbox]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-active=none]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-chosen=manchester]', state: 'visible' } },
  { wait: 900 },
]);
