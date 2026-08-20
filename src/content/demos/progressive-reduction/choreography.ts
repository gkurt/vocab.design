import { steps } from '#src/stage/choreography.ts';

// One control at four points in one person's history with it, ending back where it mounts.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=control][data-stage=first]', state: 'visible' } },
  { assert: { selector: '[data-part=label]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=stage-familiar]' },
  { wait: 250 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=control][data-stage=familiar]', state: 'visible' } },
  { assert: { selector: '[data-part=label]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=stage-expert]' },
  { wait: 250 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=control][data-stage=expert]', state: 'visible' } },
  // The label is gone; the control itself is still on stage and still the same size class.
  { assert: { selector: '[data-part=label]', state: 'hidden' } },
  { assert: { selector: '[data-part=control]', state: 'visible' } },
  { wait: 1300 },

  { moveTo: '[data-part=stage-return]' },
  { wait: 250 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=control][data-stage=return]', state: 'visible' } },
  { assert: { selector: '[data-part=label]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=stage-first]' },
  { wait: 250 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=control][data-stage=first]', state: 'visible' } },
  { assert: { selector: '[data-part=label]', state: 'visible' } },
  { wait: 800 },
]);
