import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The first stage holds 1600 ms, so this claim lands well inside it.
  { wait: 500 },
  { assert: { selector: '[data-part=paragraph][data-stage=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=run-italic][data-stage=fallback]', state: 'visible' } },
  // The roman lands at 1600 and holds until 4000: claim it in the middle.
  { wait: 1700 },
  { assert: { selector: '[data-part=paragraph][data-stage=roman]', state: 'visible' } },
  // The two runs whose own files have not arrived are being faked from the roman.
  { assert: { selector: '[data-part=run-italic][data-stage=roman]', state: 'visible' } },
  { assert: { selector: '[data-part=run-bold][data-stage=roman]', state: 'visible' } },
  // The last two files land at 4000 and the paragraph stays there.
  { wait: 2300 },
  { assert: { selector: '[data-part=paragraph][data-stage=styles]', state: 'visible' } },
  { assert: { selector: '[data-part=run-italic][data-stage=styles]', state: 'visible' } },
  { assert: { selector: '[data-part=stage-label]', state: 'visible' } },
  { wait: 600 },
  // Reload is the one control a load can honestly be given: no input downloads a file.
  { moveTo: '[data-part=reload]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=paragraph][data-stage=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=run-italic][data-stage=styles]', state: 'hidden' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=paragraph][data-stage=roman]', state: 'visible' } },
  { wait: 700 },
]);
