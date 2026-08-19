import { steps } from '#src/stage/choreography.ts';

// The light only exists while a pointer is inside the card, so the script walks three points
// across it and proves the glow moved (`data-zone`) rather than merely appeared, then leaves
// for the caption, which sits well clear of the card (SPEC §8, law of aiming outside clicks).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { assert: { selector: '[data-part=glow]', state: 'hidden' } },

  { moveTo: '[data-part=aim-left]' },
  { wait: 600 },
  { assert: { selector: '[data-part=glow][data-zone=left]', state: 'visible' } },

  { moveTo: '[data-part=aim-mid]' },
  { wait: 600 },
  { assert: { selector: '[data-part=glow][data-zone=mid]', state: 'visible' } },

  { moveTo: '[data-part=aim-right]' },
  { wait: 600 },
  { assert: { selector: '[data-part=glow][data-zone=right]', state: 'visible' } },

  { moveTo: '[data-part=caption]' },
  { wait: 700 },
  { assert: { selector: '[data-part=glow]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout]', state: 'visible' } },
  { wait: 600 },
]);
