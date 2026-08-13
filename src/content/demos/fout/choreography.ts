import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The mount is the flash itself: readable text, in the wrong face, at the wrong width.
  { wait: 1800 },
  { assert: { selector: '[data-part=sample][data-phase=loaded]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 350 },
  { assert: { selector: '[data-part=sample][data-phase=fallback]', state: 'visible' } },
  // The words are there in both phases, which is the whole difference from FOIT.
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=sample][data-phase=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { moveTo: '[data-part=widths]' },
  { wait: 900 },
  { assert: { selector: '[data-part=widths]', state: 'visible' } },
]);
