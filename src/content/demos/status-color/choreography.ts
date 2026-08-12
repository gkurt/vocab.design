import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=row]', state: 'visible' } },
  { assert: { selector: '[data-part=banner][data-status="success"]', state: 'visible' } },
  { wait: 900 },
  // Each badge names an absolute status, so the banner never depends on what it found.
  { moveTo: '[data-part=chip-warning]' },
  { click: true },
  { assert: { selector: '[data-part=banner][data-status="warning"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-warning][data-selected]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=chip-danger]' },
  { click: true },
  { assert: { selector: '[data-part=banner][data-status="danger"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=chip-info]' },
  { click: true },
  { assert: { selector: '[data-part=banner][data-status="info"]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=chip-success]' },
  { click: true },
  { assert: { selector: '[data-part=banner][data-status="success"]', state: 'visible' } },
  { wait: 1000 },
]);
