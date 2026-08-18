import { steps } from '#src/stage/choreography.ts';

// Three presentations, each opened by the trigger and dismissed by the modal's own control, so every
// step reaches a state rather than flipping one. The transition is 300 ms, so each claim is given six
// hundred, and the mode is only ever changed while the modal is closed.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=scene][data-mode=sheet][data-state=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=modal]', state: 'hidden' } },
  { assert: { selector: '[data-part=open]', state: 'visible' } },

  // Rising from the bottom edge, then leaving through the same edge.
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=modal]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-mode=sheet][data-state=presented]', state: 'visible' } },
  { assert: { selector: '[data-part=scrim]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=done]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=modal]', state: 'hidden' } },
  { assert: { selector: '[data-part=scene][data-state=closed]', state: 'visible' } },

  // Growing in the centre.
  { moveTo: '[data-part=seg-zoom]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=scene][data-mode=zoom][data-state=closed]', state: 'visible' } },
  { assert: { selector: '[data-part=modal]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=modal]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-mode=zoom][data-state=presented]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=done]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=modal]', state: 'hidden' } },

  // Taking the whole scene.
  { moveTo: '[data-part=seg-cover]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=scene][data-mode=cover][data-state=closed]', state: 'visible' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=modal]', state: 'visible' } },
  { assert: { selector: '[data-part=scene][data-mode=cover][data-state=presented]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=done]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=modal]', state: 'hidden' } },

  { moveTo: '[data-part=seg-sheet]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=scene][data-mode=sheet][data-state=closed]', state: 'visible' } },
  { wait: 600 },
]);
