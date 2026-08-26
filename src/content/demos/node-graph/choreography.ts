import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mounted half wired: the source fans out to two steps and only one of them reaches the sink.
  { assert: { selector: '[data-part=graph][data-links="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=wire-a-b]', state: 'visible' } },
  { assert: { selector: '[data-part=port-d-in]', state: 'visible' } },
  { wait: 800 },
  // A wire is pulled out of one port and dropped on another, which is the graph changing.
  { moveTo: '[data-part=port-c-out]' },
  { wait: 350 },
  { drag: { to: '[data-part=port-d-in]' } },
  { wait: 650 },
  { assert: { selector: '[data-part=wire-c-d]', state: 'visible' } },
  { assert: { selector: '[data-part=graph][data-links="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-links="4"]', state: 'visible' } },
  { wait: 900 },
]);
