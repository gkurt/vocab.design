import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The bar is there before any tool is open, which is what persistent means.
  { wait: 700 },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-notes]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-notes][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=panel-reminders][data-open]', state: 'hidden' } },
  { wait: 300 },

  // A tool opens upward over the record, and the record stays exactly where it was.
  { moveTo: '[data-part=tool-notes]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel-notes][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-notes][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { wait: 600 },

  // Another tool switches the panel rather than stacking a second one.
  { moveTo: '[data-part=tool-reminders]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel-reminders][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-notes][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=tool-notes][data-open]', state: 'hidden' } },
  { wait: 600 },

  // Explicit dismissal returns the bar to itself, with the page untouched underneath.
  { moveTo: '[data-part=close-reminders]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=panel-reminders][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=tool-reminders][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 700 },
]);
