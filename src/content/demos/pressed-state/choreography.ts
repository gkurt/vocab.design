import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=button][data-pressed]', state: 'hidden' } },
  // The reference row states the same three states with no pointer on any of them,
  // which is the only way a synthesized pass can show a pointer state at all.
  { assert: { selector: '[data-part=ref-pressed][data-pressed]', state: 'visible' } },
  { moveTo: '[data-part=button]' },
  { wait: 400 },
  { click: true },
  // The paint outlives the finger by design, so it is still up when the script looks.
  { assert: { selector: '[data-part=button][data-pressed]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-presses="1"]', state: 'visible' } },
  { wait: 900 },
  // And it does come back down: a pressed state that stays reads as a stuck button.
  { assert: { selector: '[data-part=button][data-pressed]', state: 'hidden' } },
  { wait: 900 },
]);
