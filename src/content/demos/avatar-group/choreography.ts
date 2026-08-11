import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=group]', state: 'visible' } },
  { assert: { selector: '[data-part=rest-popover]', state: 'hidden' } },
  { moveTo: '[data-part=overflow]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=rest-popover]', state: 'visible' } },
  { assert: { selector: '[data-part=rest-dana]', state: 'visible' } },
  { assert: { selector: '[data-part=overflow][aria-expanded="true"]', state: 'visible' } },
  { wait: 1800 },
  // Dismissal is its own gesture, aimed somewhere the popover is not (SPEC §8).
  { moveTo: '[data-part=screen-top]' },
  { click: true },
  { wait: 420 },
  { assert: { selector: '[data-part=rest-popover]', state: 'hidden' } },
  { assert: { selector: '[data-part=overflow][aria-expanded="false"]', state: 'visible' } },
  { wait: 700 },
]);
