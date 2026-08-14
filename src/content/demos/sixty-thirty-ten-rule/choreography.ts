import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The screen mounts on the ratio, which is the state identify is allowed to pose.
  { assert: { selector: '[data-part=screen][data-mix="balanced"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-shout]' },
  { click: true },
  { wait: 700 },
  // Same three colours, four times as much accent, and the bar says so.
  { assert: { selector: '[data-part=screen][data-mix="shout"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mix="shout"]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-balanced]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=screen][data-mix="balanced"]', state: 'visible' } },
  { assert: { selector: '[data-part=pct-accent]', state: 'visible' } },
  { wait: 1100 },
]);
