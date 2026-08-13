import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=rates]', state: 'visible' } },
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
