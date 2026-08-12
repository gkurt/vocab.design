import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=link-tuned]', state: 'visible' } },
  { assert: { selector: '[data-part=link-plain]', state: 'visible' } },
  { assert: { selector: '[data-part=link-hover][data-hovered]', state: 'hidden' } },
  { wait: 700 },
  { moveTo: '[data-part=link-plain]' },
  { wait: 900 },
  { moveTo: '[data-part=link-tuned]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=link-tuned]', state: 'visible' } },
  // The third line has no marker until a pointer is on it, which is the whole
  // objection to the pattern: the cursor has to arrive for it to exist.
  { moveTo: '[data-part=link-hover]' },
  { wait: 700 },
  { assert: { selector: '[data-part=link-hover][data-hovered]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=readout]' },
  { wait: 700 },
  { assert: { selector: '[data-part=link-hover][data-hovered]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 700 },
]);
