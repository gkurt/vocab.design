import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=submenu]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  // The parent menu is up; nothing has asked for the nested panel yet.
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { assert: { selector: '[data-part=submenu]', state: 'hidden' } },
  { moveTo: '[data-part=parent-item]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  // The row says it owns an open panel, and the panel is beside it.
  { assert: { selector: '[data-part=parent-item][aria-expanded="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=submenu]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=sub-plain]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  // A choice in the child closes the whole stack and lands on the document.
  { assert: { selector: '[data-part=submenu]', state: 'hidden' } },
  { assert: { selector: '[data-part=menu]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-choice=plain]', state: 'visible' } },
  { wait: 1200 },
]);
