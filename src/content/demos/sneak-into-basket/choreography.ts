import { steps } from '#src/stage/choreography.ts';

// The line nobody chose, and the box that chose it: the cursor traces the extra back to the
// control on the screen before, then reaches the state where the same offer starts off.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=sneak-row][data-mode=sneaky]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-in][data-checked]', state: 'visible' } },
  { assert: { selector: '[data-part=total][data-mode=sneaky]', state: 'visible' } },
  { moveTo: '[data-part=sneak-row]' },
  { wait: 700 },
  { moveTo: '[data-part=opt-in]' },
  { wait: 900 },
  { moveTo: '[data-part=mode-fair]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=sneak-row]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-in][data-checked]', state: 'hidden' } },
  { assert: { selector: '[data-part=total][data-mode=fair]', state: 'visible' } },
  { wait: 1500 },
]);
