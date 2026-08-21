import { steps } from '#src/stage/choreography.ts';

// The three tracks run once at mount: 70 ms of lead, 1400 ms of travel, and a settle beat.
// The opening wait outlasts all of it, so Replay is pressed at rest and no dot is ever sent
// back to the start mid-flight (SPEC §8).
export default steps([
  { wait: 1900 },
  { assert: { selector: '[data-part=rates][data-state=settled]', state: 'visible' } },
  // Replay is the one control, and it names a run rather than toggling one (SPEC §8).
  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 300 },
  // Judged well inside the 1400 ms trip: every rate is still placing frames.
  { assert: { selector: '[data-part=rates][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-fps60][data-at=travel]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-fps12][data-at=travel]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=rates][data-state=settled]', state: 'visible' } },
  // The same distance, whatever the budget was: all three land on the far end.
  { assert: { selector: '[data-part=dot-fps60][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-fps30][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-fps12][data-at=end]', state: 'visible' } },
  { wait: 600 },
]);
