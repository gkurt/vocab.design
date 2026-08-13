import { steps } from '#src/stage/choreography.ts';

/**
 * The same sentence three ways: pointed at by id, carried by a title, and joined to nothing
 * at all. The name never moves, which is what makes the description's absence readable. Each
 * segment reaches its own strategy and the pass ends where it started (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=desc-row][data-state=present]', state: 'visible' } },
  { assert: { selector: '[data-part=desc][data-from=describedby]', state: 'visible' } },
  { assert: { selector: '[data-part=control][aria-describedby]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-title]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=control][title]', state: 'visible' } },
  { assert: { selector: '[data-part=desc][data-from=title]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'hidden' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=desc-row][data-state=missing]', state: 'visible' } },
  { assert: { selector: '[data-part=desc][data-from=nothing]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-state=named]', state: 'visible' } },
  { assert: { selector: '[data-part=hint]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-describedby]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=desc-row][data-state=present]', state: 'visible' } },
  { wait: 900 },
]);
