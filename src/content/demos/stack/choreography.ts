import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Mounts on the rule: one gap on the parent, an even rhythm off the boxes.
  { assert: { selector: '[data-part=column][data-mode=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-rhythm=even]', state: 'visible' } },
  { wait: 900 },
  // Break it: four margins, three different gaps, measured off the same boxes.
  { moveTo: '[data-part=seg-soup]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-mode=soup]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-rhythm=ragged]', state: 'visible' } },
  { assert: { selector: '[data-part=item-4]', state: 'visible' } },
  { wait: 1500 },
  // Restore the rule, which is also the state the pose shows (SPEC §6).
  { moveTo: '[data-part=seg-stack]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=column][data-rhythm=even]', state: 'visible' } },
  { wait: 800 },
]);
