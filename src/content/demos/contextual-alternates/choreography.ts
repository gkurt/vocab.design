import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=run-arrow][data-calt=on]', state: 'visible' } },
  // Both contextual forms are on stage, and the characters they stand for are not.
  { assert: { selector: '[data-part=alt-arrow]', state: 'visible' } },
  { assert: { selector: '[data-part=alt-noteq]', state: 'visible' } },
  { assert: { selector: '[data-part=lit-arrow]', state: 'hidden' } },
  // The run no rule mentions is drawn as typed in both states.
  { assert: { selector: '[data-part=lit-plain]', state: 'visible' } },
  // Absolute picks, never a flip: the segments are the two values the feature takes.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=run-arrow][data-calt=off]', state: 'visible' } },
  { assert: { selector: '[data-part=lit-arrow]', state: 'visible' } },
  { assert: { selector: '[data-part=lit-noteq]', state: 'visible' } },
  { assert: { selector: '[data-part=alt-arrow]', state: 'hidden' } },
  { assert: { selector: '[data-part=alt-noteq]', state: 'hidden' } },
  { assert: { selector: '[data-part=lit-plain]', state: 'visible' } },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  // Ends with the feature on, the state the subject's data-pose calls honest.
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=run-arrow][data-calt=on]', state: 'visible' } },
  { assert: { selector: '[data-part=alt-noteq]', state: 'visible' } },
  { wait: 700 },
]);
