import { steps } from '#src/stage/choreography.ts';

// Three absolute picks, never a toggle (SPEC §8): each segment reaches its own name,
// and the pass ends back on the state the demo mounts in. The avatar assert is the
// term's second claim, that the picture in the row is derived from the name.
export default steps([
  { assert: { selector: '[data-part=from][data-kind="person"]', state: 'visible' } },
  { assert: { selector: '[data-part=avatar][data-initials="AR"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=kind-brand]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=from][data-kind="brand"]', state: 'visible' } },
  { assert: { selector: '[data-part=avatar][data-initials="QB"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=kind-both]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=from][data-kind="both"]', state: 'visible' } },
  { assert: { selector: '[data-part=avatar][data-initials="A"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=kind-person]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=from][data-kind="person"]', state: 'visible' } },
  { wait: 900 },
]);
