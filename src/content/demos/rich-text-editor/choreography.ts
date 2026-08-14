import { steps } from '#src/stage/choreography.ts';

// Each control lands on an absolute document state: marked, listed, emptied (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=pane]', state: 'visible' } },
  { assert: { selector: '[data-part=model][data-doc="plain"]', state: 'visible' } },
  { wait: 700 },
  // Formatting is shown where it will be read, and the model records a mark, not markup.
  { moveTo: '[data-part=fmt-bold]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=sel][data-strong]', state: 'visible' } },
  { assert: { selector: '[data-part=model][data-doc="strong"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=fmt-list]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=model][data-doc="list"]', state: 'visible' } },
  { wait: 900 },
  // Emptied, the surface says what it is for.
  { moveTo: '[data-part=draft]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=placeholder]', state: 'visible' } },
  { assert: { selector: '[data-part=model][data-doc="empty"]', state: 'visible' } },
  { wait: 900 },
]);
