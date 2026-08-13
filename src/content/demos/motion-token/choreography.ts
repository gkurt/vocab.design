import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The pass the table plays on mount, run out to the end.
  { wait: 1000 },
  { assert: { selector: '[data-part=table][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=consumer][data-arrived]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-duration-fast]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=replay]' },
  { click: true },
  // Judged with the slow rows still running and the fast ones already home.
  { assert: { selector: '[data-part=table][data-state=playing]', state: 'visible' } },
  { assert: { selector: '[data-part=consumer][data-arrived]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=table][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-ease-exit]', state: 'visible' } },
  { wait: 700 },
]);
