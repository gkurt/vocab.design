import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=tag-typography]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-triage]', state: 'visible' } },
  { wait: 1000 },
  // Only the tag somebody put on can be taken off, and only it leaves.
  { moveTo: '[data-part=tag-triage-remove]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=tag-triage]', state: 'hidden' } },
  { assert: { selector: '[data-part=tag-typography]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-docs]', state: 'visible' } },
  { wait: 900 },
]);
