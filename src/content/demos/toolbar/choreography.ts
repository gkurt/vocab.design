import { steps } from '#src/stage/choreography.ts';

// Every step lands on a named state: a click chooses a style outright, and the arrow
// that follows moves from the item that click just anchored (SPEC §8).
export default steps([
  { assert: { selector: '[data-part=tool-body][aria-checked="true"]', state: 'visible' } },
  { moveTo: '[data-part=tool-heading]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-heading][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=tool-body][aria-checked="true"]', state: 'hidden' } },
  { assert: { selector: '[data-part=prose][data-style=heading]', state: 'visible' } },
  { wait: 800 },
  // One tab stop, arrows inside it: focus moves to the next item without activating it.
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-quote][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=prose][data-style=heading]', state: 'visible' } },
  { wait: 600 },
  { press: 'Enter' },
  { wait: 500 },
  { assert: { selector: '[data-part=tool-quote][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=prose][data-style=quote]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=tool-copy]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=status][data-value=copied]', state: 'visible' } },
  { wait: 900 },
]);
