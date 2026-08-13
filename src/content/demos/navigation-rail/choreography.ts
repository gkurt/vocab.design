import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=rail]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'visible' } },
  { wait: 700 },
  // Each destination is named outright, so a pass joined anywhere lands where the
  // step says rather than one step along from whatever it found (SPEC §8).
  { moveTo: '[data-part=nav-saved]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=nav-saved][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'hidden' } },
  { assert: { selector: '[data-part=pane][data-view=saved]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-agenda]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=nav-agenda][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=pane][data-view=agenda]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-inbox]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=nav-inbox][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=pane][data-view=inbox]', state: 'visible' } },
  { wait: 800 },
]);
