import { steps } from '#src/stage/choreography.ts';

// Open the help beside the form, type into the form with it open, step forward with it
// still open, then close it explicitly.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=form][data-step="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-open]', state: 'hidden' } },
  { wait: 400 },

  { moveTo: '[data-part=open]' },
  { wait: 300 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=help][data-open]', state: 'visible' } },
  { assert: { selector: '[data-part=form][data-step="1"]', state: 'visible' } },
  { wait: 500 },

  // The form is still the form: it takes a keystroke with the panel open beside it.
  { moveTo: '[data-part=input-second]' },
  { click: true },
  { wait: 250 },
  { type: 'GB 421 8830 07' },
  { wait: 400 },
  { assert: { selector: '[data-part=form][data-typed=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-open]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=form][data-step="2"]', state: 'visible' } },
  // The step changed and the panel did not close itself.
  { assert: { selector: '[data-part=help][data-open]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=close]' },
  { wait: 250 },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=help][data-open]', state: 'hidden' } },
  { assert: { selector: '[data-part=form][data-step="2"]', state: 'visible' } },
  { wait: 700 },
]);
