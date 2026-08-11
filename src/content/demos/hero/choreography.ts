import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=hero]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { moveTo: '[data-part=headline]' },
  { wait: 900 },
  { assert: { selector: '[data-part=subline]', state: 'visible' } },
  { moveTo: '[data-part=cta]' },
  { wait: 900 },
  // One primary action, one quieter alternative, and the next section already
  // starting underneath: the block ends where the page carries on.
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { assert: { selector: '[data-part=next]', state: 'visible' } },
  { wait: 900 },
]);
