import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=file-row]', state: 'hidden' } },
  // Route one: the button that stands in for the system picker.
  { moveTo: '[data-part=browse]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=file-row][data-state=uploading]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=file-row][data-state=done]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=remove]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=file-row]', state: 'hidden' } },
  { assert: { selector: '[data-part=uploads-empty]', state: 'visible' } },
  { wait: 700 },
  // Route two: the same control, taking a file released onto it.
  { moveTo: '[data-part=file]' },
  { drag: { to: '[data-part=uploader]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=file-row]', state: 'visible' } },
  // The drag is over, so the region stops advertising that it would take one.
  { assert: { selector: '[data-part=uploader][data-active]', state: 'hidden' } },
  { wait: 1900 },
  { assert: { selector: '[data-part=file-row][data-state=done]', state: 'visible' } },
  { wait: 900 },
]);
