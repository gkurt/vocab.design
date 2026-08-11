import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=single]', state: 'visible' } },
  { assert: { selector: '[data-part=clamp]', state: 'visible' } },
  { assert: { selector: '[data-part=full]', state: 'visible' } },
  { wait: 900 },
  // The cursor walks the three readings the way a reader compares them; none of
  // them answers a pointer, because a cut line is not a control.
  { moveTo: '[data-part=full]' },
  { wait: 900 },
  { moveTo: '[data-part=clamp]' },
  { wait: 900 },
  { moveTo: '[data-part=single]' },
  { wait: 900 },
  { assert: { selector: '[data-part=single]', state: 'visible' } },
  { wait: 600 },
]);
