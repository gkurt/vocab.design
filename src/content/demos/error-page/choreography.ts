import { steps } from '#src/stage/choreography.ts';

// The page is there from the first frame, because a reader arrives already on it. The
// picker names an absolute register rather than flipping the one it found (SPEC §8), and
// the two ways back are asserted in both registers: a change of voice, not of duty.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-register=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=ways]', state: 'visible' } },
  { assert: { selector: '[data-part=mark]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-playful]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page][data-register=playful]', state: 'visible' } },
  { assert: { selector: '[data-part=mark]', state: 'visible' } },
  { assert: { selector: '[data-part=ways]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page][data-register=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=mark]', state: 'hidden' } },
  { wait: 900 },
]);
