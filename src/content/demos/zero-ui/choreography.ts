import { steps } from '#src/stage/choreography.ts';

// One task, twice, with nothing drawn. The proof is that every state the device reaches is
// carried by the ring and the audio: spoken command, ring listening, ring working, an
// answer that arrives as a sentence and a chime, then the same device answering a gesture.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=device][data-phase=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=chime]', state: 'hidden' } },
  { assert: { selector: '[data-part=reply]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=speak]' },
  { click: true },
  // Judged inside the listening beat, well clear of both its ends.
  { assert: { selector: '[data-part=device][data-phase=listening]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=said]', state: 'visible' } },
  { assert: { selector: '[data-part=device][data-phase=answered]', state: 'visible' } },
  { assert: { selector: '[data-part=reply]', state: 'visible' } },
  { assert: { selector: '[data-part=chime]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=wave]' },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=device][data-phase=answered]', state: 'visible' } },
  { assert: { selector: '[data-part=said]', state: 'visible' } },
  { assert: { selector: '[data-part=chime]', state: 'visible' } },
  { wait: 900 },
]);
