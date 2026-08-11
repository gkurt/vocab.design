import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 700 },
  // First path: a press on the page behind it, on nothing in particular.
  { moveTo: '[data-part=page]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'visible' } },
  { wait: 700 },
  // Second path: the same dismissal for a reader with no outside to click.
  { press: 'Escape' },
  { wait: 400 },
  { assert: { selector: '[data-part=popover]', state: 'hidden' } },
  { wait: 1200 },
]);
