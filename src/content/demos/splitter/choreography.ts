import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=splitter][aria-valuenow="45"]', state: 'visible' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 400 },
  // Dragging past the preview pane's limit lands on the limit, so the bar reaches an
  // absolute share however the pass began (SPEC §8).
  { moveTo: '[data-part=splitter]' },
  { drag: { to: '[data-part=pane-preview]' } },
  { wait: 460 },
  { assert: { selector: '[data-part=splitter][aria-valuenow="65"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=splitter]' },
  { press: 'ArrowLeft' },
  { wait: 380 },
  { assert: { selector: '[data-part=splitter][aria-valuenow="60"]', state: 'visible' } },
  { wait: 700 },
  // Home is the keyboard's way to a limit, and the only scripted way to this one: a
  // drag can only aim at a part's centre, and nothing sits left of the editor's minimum.
  { moveTo: '[data-part=splitter]' },
  { press: 'Home' },
  { wait: 460 },
  { assert: { selector: '[data-part=splitter][aria-valuenow="25"]', state: 'visible' } },
  { wait: 800 },
  // The convention that gives the layout back: a double click restores the default.
  { moveTo: '[data-part=splitter]' },
  { dblclick: true },
  { wait: 460 },
  { assert: { selector: '[data-part=splitter][aria-valuenow="45"]', state: 'visible' } },
  { wait: 900 },
]);
