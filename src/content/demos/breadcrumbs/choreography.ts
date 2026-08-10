import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=crumb-photos][aria-current=page]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=crumb-projects]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  // Going up is absolute: the trail truncates at the level named, wherever it started.
  { assert: { selector: '[data-part=folder-name][data-level=projects]', state: 'visible' } },
  { assert: { selector: '[data-part=crumb-projects][aria-current=page]', state: 'visible' } },
  { assert: { selector: '[data-part=crumb-photos]', state: 'hidden' } },
  { wait: 800 },
  { moveTo: '[data-part=open-field-guide]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=crumb-field-guide][aria-current=page]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-name][data-level=field-guide]', state: 'visible' } },
  { wait: 700 },
]);
