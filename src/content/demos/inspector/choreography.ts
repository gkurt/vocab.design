import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  // Mount has the rectangle selected, so the pane is showing that object's properties.
  { assert: { selector: '[data-part=rail][data-selection=rect]', state: 'visible' } },
  { assert: { selector: '[data-part=obj-rect][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=field-w]', state: 'visible' } },
  { wait: 900 },
  // A different kind of object, and the pane holds a different set of controls entirely.
  { moveTo: '[data-part=obj-text]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rail][data-selection=text]', state: 'visible' } },
  { assert: { selector: '[data-part=obj-text][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=field-size]', state: 'visible' } },
  { assert: { selector: '[data-part=field-w]', state: 'hidden' } },
  { wait: 1300 },
  // Nothing selected is the state that separates an inspector from a settings panel.
  { moveTo: '[data-part=canvas-empty]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rail][data-selection=none]', state: 'visible' } },
  { assert: { selector: '[data-part=rail-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=field-size]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=obj-rect]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=rail][data-selection=rect]', state: 'visible' } },
  { assert: { selector: '[data-part=obj-rect][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=field-h]', state: 'visible' } },
  { wait: 900 },
]);
