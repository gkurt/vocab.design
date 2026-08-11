import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The reference row holds its states with no pointer anywhere near it.
  { assert: { selector: '[data-part=state-hover][data-hovered]', state: 'visible' } },
  { assert: { selector: '[data-part=live][data-hovered]', state: 'hidden' } },
  // Arriving is a position, not a flip: the cursor is either on the control or not.
  { moveTo: '[data-part=live]' },
  { wait: 500 },
  { assert: { selector: '[data-part=live][data-hovered]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=note]' },
  { wait: 500 },
  { assert: { selector: '[data-part=live][data-hovered]', state: 'hidden' } },
  { wait: 900 },
]);
