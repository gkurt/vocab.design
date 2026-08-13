import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bar][data-shown]', state: 'visible' } },
  { assert: { selector: '[data-part=player][data-playing]', state: 'hidden' } },
  { moveTo: '[data-part=play]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=player][data-playing]', state: 'visible' } },
  // Left alone, the bar stands down and the picture keeps the frame to itself.
  { wait: 1800 },
  { assert: { selector: '[data-part=bar]', state: 'hidden' } },
  { moveTo: '[data-part=poster]' },
  { wait: 500 },
  { assert: { selector: '[data-part=bar][data-shown]', state: 'visible' } },
  // The same button both ways, which is the one flip this term is allowed (SPEC §8).
  { moveTo: '[data-part=play]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=player][data-playing]', state: 'hidden' } },
  { assert: { selector: '[data-part=bar][data-shown]', state: 'visible' } },
  { wait: 900 },
]);
