import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=toggle][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=region]', state: 'hidden' } },
  { moveTo: '[data-part=toggle]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=region]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle][aria-expanded="true"]', state: 'visible' } },
  { wait: 1700 },
  // The toggling is the term, so the script closes it again rather than leaving the
  // next pass to guess which way it found the region (SPEC §8).
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=region]', state: 'hidden' } },
  { assert: { selector: '[data-part=toggle][aria-expanded="false"]', state: 'visible' } },
  { wait: 700 },
]);
