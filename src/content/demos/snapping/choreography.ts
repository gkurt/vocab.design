import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=card][data-cell="2-2"]', state: 'visible' } },
  { assert: { selector: '[data-part=ghost]', state: 'hidden' } },
  { moveTo: '[data-part=card]' },
  { wait: 400 },
  // Released with the pointer over an intersection, so the corner it carries is a
  // dozen pixels short of one and gets pulled the rest of the way.
  { drag: { to: '[data-part=dot-3-2]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-cell="3-2"]', state: 'visible' } },
  // The outline only exists while a drag is looking for somewhere to land.
  { assert: { selector: '[data-part=ghost]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=card]' },
  { wait: 300 },
  // Absolute again: this landing is decided by where the pointer let go, not by the
  // cell the pass happened to start from.
  { drag: { to: '[data-part=dot-4-3]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=card][data-cell="4-3"]', state: 'visible' } },
  { wait: 1100 },
]);
