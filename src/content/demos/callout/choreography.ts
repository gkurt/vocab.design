import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=prose-before]', state: 'visible' } },
  { assert: { selector: '[data-part=callout]', state: 'visible' } },
  { assert: { selector: '[data-part=prose-after]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=callout]' },
  { wait: 900 },
  // Staying put is the claim: hovering it offers nothing and dismisses nothing.
  { assert: { selector: '[data-part=callout]', state: 'visible' } },
  { moveTo: '[data-part=prose-after]' },
  { wait: 900 },
  { assert: { selector: '[data-part=callout]', state: 'visible' } },
  { wait: 600 },
]);
