import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the file has already arrived, which is the state a page spends its life in.
  { assert: { selector: '[data-part=sample][data-phase=loaded]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 300 },
  // The load is back in flight: readable text, in the wrong face, at the wrong widths.
  { assert: { selector: '[data-part=sample][data-phase=fallback]', state: 'visible' } },
  { wait: 1500 },
  // The file landed and the text was re-set in it.
  { assert: { selector: '[data-part=sample][data-phase=loaded]', state: 'visible' } },
  { wait: 900 },
]);
