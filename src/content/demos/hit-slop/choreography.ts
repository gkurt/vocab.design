import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=add][data-hit=none]', state: 'visible' } },
  { assert: { selector: '[data-part=mode-drawn][data-selected]', state: 'visible' } },
  // Draw the region that is otherwise only a fact about where events land.
  { moveTo: '[data-part=mode-area]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=mode-area][data-selected]', state: 'visible' } },
  { wait: 500 },
  // On the artwork, where anyone would aim.
  { moveTo: '[data-part=dot-art]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=add][data-hit=artwork]', state: 'visible' } },
  { wait: 800 },
  // Off the artwork entirely, inside the invisible extension: still the button's tap.
  { moveTo: '[data-part=dot-slop]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=add][data-hit=slop]', state: 'visible' } },
  { wait: 800 },
  // Past the extension, where the slop stops and so does the button.
  { moveTo: '[data-part=dot-miss]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=add][data-hit=none]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=mode-drawn]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=mode-drawn][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
