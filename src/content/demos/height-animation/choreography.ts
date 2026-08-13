import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=panel][data-state=collapsed]', state: 'hidden' } },
  // The flip is the term, so the trigger toggles and the script drives both ways (SPEC §8).
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { assert: { selector: '[data-part=trigger][aria-expanded="true"]', state: 'visible' } },
  { wait: 700 },
  // One grew over 420 ms to the height it measured; the other was at its full size a frame
  // after the press, because `auto` had nothing to interpolate.
  { assert: { selector: '[data-part=panel][data-state=expanded]', state: 'visible' } },
  { assert: { selector: '[data-part=twin][data-state=expanded]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=trigger]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=panel][data-state=collapsed]', state: 'hidden' } },
  { assert: { selector: '[data-part=trigger][aria-expanded="false"]', state: 'visible' } },
  { wait: 500 },
]);
