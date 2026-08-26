import { steps } from '#src/stage/choreography.ts';

// Every ground is named absolutely by its own segment, so a pass resumed anywhere reaches the
// state it asks for rather than flipping whatever it found (SPEC §8). The opening wait is the
// kit's mount fade; each claim is qualified by the ground AND the step, since the whole point
// is that the same four steps are still four steps on a ground where they cannot be seen.
export default steps([
  { wait: 460 },
  { assert: { selector: '[data-part=card-overlay][data-ground=paper][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-rest][data-ground=paper][data-step="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=value-overlay]', state: 'visible' } },
  { wait: 1500 },

  { moveTo: '[data-part=seg-night]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-overlay][data-ground=night][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-raised][data-ground=night][data-step="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-lifted]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-overlay][data-ground=lifted][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-float][data-ground=lifted][data-step="2"]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-paper]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=card-overlay][data-ground=paper][data-step="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=plate]', state: 'visible' } },
  { wait: 800 },
]);
