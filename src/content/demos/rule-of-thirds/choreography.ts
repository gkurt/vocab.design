import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The picture fades in from mount, so the first reading of the guides waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=grid][data-mode=thirds]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { assert: { selector: '[data-part=sea]', state: 'visible' } },
  { wait: 800 },

  // The counter-example: the same picture composed on the middle instead of the thirds.
  { moveTo: '[data-part=seg-centre]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-mode=centre]', state: 'visible' } },
  { assert: { selector: '[data-part=photo]', state: 'visible' } },
  { wait: 900 },

  // Back onto the lines, which is the state the specimen rests in.
  { moveTo: '[data-part=seg-thirds]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=grid][data-mode=thirds]', state: 'visible' } },
  { assert: { selector: '[data-part=sun]', state: 'visible' } },
  { wait: 800 },
]);
