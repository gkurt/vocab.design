import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=screen][data-result=open]', state: 'visible' } },
  { assert: { selector: '[data-part=sheet]', state: 'visible' } },
  { moveTo: '[data-part=sheet]' },
  { scrub: { reps: 3 } },
  { wait: 600 },
  // The claim lands on the screen, which stays: the sheet is the thing that left.
  { assert: { selector: '[data-part=screen][data-result=dismissed]', state: 'visible' } },
  { assert: { selector: '[data-part=list]', state: 'visible' } },
  { assert: { selector: '[data-part=gone]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=seg-ignores]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=screen][data-result=open]', state: 'visible' } },
  { moveTo: '[data-part=sheet]' },
  { scrub: { reps: 3 } },
  { wait: 600 },
  { assert: { selector: '[data-part=screen][data-result=stranded]', state: 'visible' } },
  { assert: { selector: '[data-part=gone]', state: 'visible' } },
  { wait: 900 },
]);
