import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  // Mounted on the zero-width space: two lines, and no hyphen drawn at the break.
  { assert: { selector: '[data-part=string][data-mode=zwsp][data-lines="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=string][data-hyphen=no]', state: 'visible' } },
  { assert: { selector: '[data-part=break]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names what sits between the words.
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  // Nothing between the words is nothing to break on, so the name stays on one line.
  { assert: { selector: '[data-part=string][data-mode=none][data-lines="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=break]', state: 'hidden' } },
  { moveTo: '[data-part=seg-shy]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=string][data-mode=shy][data-lines="2"]', state: 'visible' } },
  // The line box is wider than the words it ends with: a hyphen was drawn.
  { assert: { selector: '[data-part=string][data-hyphen=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=break]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends on the zero-width space, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-zwsp]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=string][data-mode=zwsp][data-lines="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=string][data-hyphen=no]', state: 'visible' } },
  { wait: 700 },
]);
