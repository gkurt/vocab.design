import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the text waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=badge][data-mode=imposter]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-text=untouched]', state: 'visible' } },
  { assert: { selector: '[data-part=para-3]', state: 'visible' } },
  { wait: 600 },

  // The same badge given a place in the flow: everything below it moves down.
  { moveTo: '[data-part=seg-flow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-mode=flow]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-text=pushed]', state: 'visible' } },
  { assert: { selector: '[data-part=para-3]', state: 'visible' } },
  { wait: 800 },

  // Back out of the flow, and the text returns to where it belongs.
  { moveTo: '[data-part=seg-imposter]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-mode=imposter]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-text=untouched]', state: 'visible' } },
  { wait: 700 },
]);
