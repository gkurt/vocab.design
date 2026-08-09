import { steps } from '#src/stage/choreography.ts';

// Each scroll clears one section heading (about 106px tall) with margin on both
// sides, so the highlight advances exactly one entry per step.
export default steps([
  { assert: { selector: '[data-part=nav-overview][data-current]', state: 'visible' } },
  { moveTo: '[data-part=doc]' },
  { scroll: { y: 125 } },
  { wait: 700 },
  { assert: { selector: '[data-part=nav-install][data-current]', state: 'visible' } },
  { scroll: { y: 125 } },
  { wait: 700 },
  { assert: { selector: '[data-part=nav-tokens][data-current]', state: 'visible' } },
  { scroll: { y: 125 } },
  { wait: 700 },
  { assert: { selector: '[data-part=nav-api][data-current]', state: 'visible' } },
  { wait: 900 },
]);
