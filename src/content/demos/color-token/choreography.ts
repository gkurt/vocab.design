import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=chain][data-theme=aurora]', state: 'visible' } },
  { assert: { selector: '[data-part=semantic][data-ref=blue-600]', state: 'visible' } },
  { moveTo: '[data-part=seg-ember]' },
  { click: true },
  // One reference moves. Every name in the chain, and the button reading the end of
  // it, stays exactly where it was.
  { assert: { selector: '[data-part=chain][data-theme=ember]', state: 'visible' } },
  { assert: { selector: '[data-part=semantic][data-ref=orange-500]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-aurora]' },
  { click: true },
  { assert: { selector: '[data-part=semantic][data-ref=blue-600]', state: 'visible' } },
  { wait: 1300 },
]);
