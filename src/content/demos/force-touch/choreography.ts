import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=target][data-stage=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  // A brief hold climbs past the peek mark only: the preview lifts under the finger,
  // then settles back once the press releases. The crossing leaves its evidence on
  // the readout, since the peek itself is gone by the time a claim could be judged.
  { moveTo: '[data-part=target]' },
  { hold: 500 },
  { wait: 800 },
  { assert: { selector: '[data-part=readout][data-last=peek]', state: 'visible' } },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=target][data-stage=rest]', state: 'visible' } },
  { wait: 600 },
  // A long hold bottoms out: past the pop mark the preview commits, fills the pane,
  // and staying pressed is no longer what keeps it open.
  { hold: 950 },
  { wait: 800 },
  { assert: { selector: '[data-part=readout][data-last=pop]', state: 'visible' } },
  { assert: { selector: '[data-part=preview][data-stage=pop]', state: 'visible' } },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { wait: 900 },
  // Acting on the popped panel is its dismissal (SPEC §8): explicit, never a toggle.
  { moveTo: '[data-part=archive]' },
  { wait: 450 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=preview]', state: 'hidden' } },
  { assert: { selector: '[data-part=target][data-stage=rest]', state: 'visible' } },
  { wait: 700 },
]);
