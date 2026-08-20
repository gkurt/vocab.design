import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel floats over the top right of the picture, with the whole picture still there.
  { wait: 700 },
  { assert: { selector: '[data-part=hud][data-corner=tr]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-shot="1"]', state: 'visible' } },
  { wait: 300 },

  // Its controls are real controls, not a picture of some.
  { moveTo: '[data-part=tool-adjust]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-adjust][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-tool=adjust]', state: 'visible' } },
  { wait: 400 },

  // Dragged by its title strip to the other side, because it is always covering something.
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=aim-left]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=hud][data-corner=tl]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-adjust][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=strip]', state: 'visible' } },
  { wait: 500 },

  // The content underneath never stopped being live: the filmstrip still switches frames.
  { moveTo: '[data-part=thumb-3]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=canvas][data-shot="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=thumb-3][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=hud][data-corner=tl]', state: 'visible' } },
  { wait: 700 },
]);
