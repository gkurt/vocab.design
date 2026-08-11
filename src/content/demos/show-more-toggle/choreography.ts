import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=toggle][aria-expanded="false"]', state: 'visible' } },
  { assert: { selector: '[data-part=label-more]', state: 'visible' } },
  { assert: { selector: '[data-part=label-less]', state: 'hidden' } },
  { moveTo: '[data-part=toggle]' },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=text][data-expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=label-less]', state: 'visible' } },
  { assert: { selector: '[data-part=toggle][aria-expanded="true"]', state: 'visible' } },
  { wait: 1900 },
  // The honest half of the pattern: it collapses again, and the script proves it
  // rather than trusting the state a pass happens to start in (SPEC §8).
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=label-more]', state: 'visible' } },
  { assert: { selector: '[data-part=label-less]', state: 'hidden' } },
  { assert: { selector: '[data-part=toggle][aria-expanded="false"]', state: 'visible' } },
  { wait: 700 },
]);
