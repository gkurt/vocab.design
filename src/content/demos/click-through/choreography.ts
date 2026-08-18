import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-mode=raise]', state: 'visible' } },
  { assert: { selector: '[data-part=desk][data-hits="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=win-a][data-active]', state: 'visible' } },
  // Click-through off: the first click on the inactive window is spent raising it, and the
  // button under the pointer is never told a thing.
  { moveTo: '[data-part=play]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=win-b][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=desk][data-hits="0"]', state: 'visible' } },
  { wait: 900 },
  // The second click, on a window that is already active, is the one that presses Play.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=desk][data-hits="1"]', state: 'visible' } },
  { wait: 900 },
  // Notes goes back in front, so the same first click can be made again under the other policy.
  { moveTo: '[data-part=bar-a]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=win-a][data-active]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=mode-through]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=desk][data-mode=through]', state: 'visible' } },
  { wait: 700 },
  // The same click, under the other policy: the window comes forward and Play hears it too.
  { moveTo: '[data-part=play]' },
  { wait: 500 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=win-b][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=desk][data-hits="2"]', state: 'visible' } },
  { wait: 1200 },
]);
