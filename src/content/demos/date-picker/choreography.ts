import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=calendar]', state: 'hidden' } },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=calendar]', state: 'visible' } },
  { moveTo: '[data-part=day-18]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  // Picking a day is the calendar's own dismissal, and it leaves the date in the field.
  { assert: { selector: '[data-part=calendar]', state: 'hidden' } },
  { assert: { selector: '[data-part=field][data-picked]', state: 'visible' } },
  { wait: 600 },
  // Reopening shows the month standing on the chosen day rather than back at the start.
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=calendar]', state: 'visible' } },
  { assert: { selector: '[data-part=day-18][aria-selected="true"]', state: 'visible' } },
  { wait: 700 },
  { press: 'Escape' },
  { wait: 400 },
  { assert: { selector: '[data-part=calendar]', state: 'hidden' } },
]);
