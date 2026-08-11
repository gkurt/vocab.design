import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=screen-inbox][data-current]', state: 'visible' } },
  { moveTo: '[data-part=nav-message]' },
  { click: true },
  // Twice the 360ms travel: the claim is about where the track arrives.
  { wait: 750 },
  { assert: { selector: '[data-part=screen-message][data-current]', state: 'visible' } },
  // Clipped out of the viewport is not the same as gone, so the state attribute
  // is what says which screen the reader is on.
  { assert: { selector: '[data-part=screen-inbox][data-current]', state: 'hidden' } },
  { moveTo: '[data-part=nav-inbox]' },
  { click: true },
  { wait: 750 },
  { assert: { selector: '[data-part=screen-inbox][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'visible' } },
  { wait: 400 },
]);
