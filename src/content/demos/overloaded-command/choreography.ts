import { steps } from '#src/stage/choreography.ts';

// The same word pressed twice in two places, and the pane and the readout answer
// differently each time. Neither press is a toggle: one picks the dashboard, the other
// picks the files, so the pass proves the collision rather than a flip (SPEC §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=dest][data-where=none]', state: 'visible' } },
  { assert: { selector: '[data-part=view][data-view=brief]', state: 'visible' } },
  { moveTo: '[data-part=bar-home]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dest][data-where=dashboard]', state: 'visible' } },
  { assert: { selector: '[data-part=view][data-view=dashboard]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=nav-home]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dest][data-where=files]', state: 'visible' } },
  { assert: { selector: '[data-part=view][data-view=files]', state: 'visible' } },
  { assert: { selector: '[data-part=view][data-view=dashboard]', state: 'hidden' } },
  { wait: 1500 },
]);
