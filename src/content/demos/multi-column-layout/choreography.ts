import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Three regions from the start: a scope, its list, and the message that list opened.
  { assert: { selector: '[data-part=shell]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-inbox][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=row-0][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=reader-subject]', state: 'visible' } },
  { wait: 700 },
  // A pick in the middle region changes only the region to its right.
  { moveTo: '[data-part=row-1]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=row-1][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-inbox][data-current]', state: 'visible' } },
  { wait: 800 },
  // A pick on the left changes both regions to its right.
  { moveTo: '[data-part=folder-flagged]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=folder-flagged][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=row-0][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=list-header]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=row-2]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=row-2][data-selected]', state: 'visible' } },
  { wait: 900 },
  // Each folder is picked by name, so the way back is a pick too, not an undo.
  { moveTo: '[data-part=folder-inbox]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=folder-inbox][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=row-0][data-selected]', state: 'visible' } },
  { wait: 700 },
]);
