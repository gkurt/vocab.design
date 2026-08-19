import { steps } from '#src/stage/choreography.ts';

// The field animates on its own, so the script's work is to prove each register is really
// the one it was asked for and that the hero above it never moves. Every register is picked
// absolutely, so no step flips whatever it found (SPEC §8). The opening wait is the kit's
// mount fade.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=field][data-register=constellation]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },

  { moveTo: '[data-part=seg-dots]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=field][data-register=dots]', state: 'visible' } },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },

  { moveTo: '[data-part=seg-starfield]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=field][data-register=starfield]', state: 'visible' } },
  { assert: { selector: '[data-part=note]', state: 'visible' } },

  { moveTo: '[data-part=seg-constellation]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=field][data-register=constellation]', state: 'visible' } },
  { assert: { selector: '[data-part=headline]', state: 'visible' } },
  { wait: 600 },
]);
