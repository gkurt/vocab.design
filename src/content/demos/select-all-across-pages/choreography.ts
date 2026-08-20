import { steps } from '#src/stage/choreography.ts';

// Two stages, each reached by its own control (SPEC §8): the box takes the page, the
// banner's offer takes everything matching, and Clear is the explicit way back.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=banner]', state: 'hidden' } },
  { moveTo: '[data-part=cb-all]' },
  { wait: 350 },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=banner][data-scope=page]', state: 'visible' } },
  { assert: { selector: '[data-part=extend]', state: 'visible' } },
  { assert: { selector: '[data-part=row-3][data-selected]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=extend]' },
  { wait: 350 },
  { click: true },
  { wait: 550 },
  // The rows on screen look the same either way, so the banner is the only thing
  // that can report which scope is being held.
  { assert: { selector: '[data-part=banner][data-scope=all]', state: 'visible' } },
  { assert: { selector: '[data-part=clear]', state: 'visible' } },
  { assert: { selector: '[data-part=extend]', state: 'hidden' } },
  { wait: 1300 },
  { moveTo: '[data-part=clear]' },
  { wait: 300 },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=banner]', state: 'hidden' } },
  { assert: { selector: '[data-part=row-3][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=cb-all][aria-checked="false"]', state: 'visible' } },
  { wait: 1200 },
]);
