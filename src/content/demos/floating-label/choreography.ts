import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=label]', state: 'visible' } },
  { assert: { selector: '[data-part=label][data-floated]', state: 'hidden' } },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: 'Ada Lovelace' },
  // Well past the 180ms rise, so the claim is about where the label ended up.
  { wait: 700 },
  { assert: { selector: '[data-part=label][data-floated]', state: 'visible' } },
  { wait: 1500 },
  // Emptying the field is what sends it back down: the position is read off the
  // value, so no pass can leave the label in the wrong place.
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=label][data-floated]', state: 'hidden' } },
  { wait: 900 },
]);
