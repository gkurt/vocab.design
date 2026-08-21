import { steps } from '#src/stage/choreography.ts';

// A hostile terminal, drawn at rest: the neon frame, the split title and the hazard
// chrome answer no pointer, so the pass states them instead of touring them.
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=header]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 1000 },
  { assert: { selector: '[data-part=ticks]', state: 'visible' } },
  { assert: { selector: '[data-part=meter-a]', state: 'visible' } },
  { assert: { selector: '[data-part=meter-b]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=warning]', state: 'visible' } },
  { assert: { selector: '[data-part=serial]', state: 'visible' } },
  { assert: { selector: '[data-part=jack]', state: 'visible' } },
  { wait: 1200 },
]);
