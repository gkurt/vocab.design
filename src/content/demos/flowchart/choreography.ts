import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // The mounted source has one path through it, so the picture is a single column.
  { assert: { selector: '[data-part=diagram][data-mode=linear]', state: 'visible' } },
  { assert: { selector: '[data-part=node-C]', state: 'visible' } },
  { assert: { selector: '[data-part=node-D]', state: 'hidden' } },
  { wait: 800 },
  // One more line of text, and the engine re-places every box: nobody positions a flowchart.
  { moveTo: '[data-part=seg-branch]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=diagram][data-mode=branch]', state: 'visible' } },
  { assert: { selector: '[data-part=node-D]', state: 'visible' } },
  { assert: { selector: '[data-part=arrow-B-D]', state: 'visible' } },
  { assert: { selector: '[data-part=line-4]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-linear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=diagram][data-mode=linear]', state: 'visible' } },
  { assert: { selector: '[data-part=node-D]', state: 'hidden' } },
  { assert: { selector: '[data-part=seg-linear][aria-selected="true"]', state: 'visible' } },
  { wait: 800 },
]);
