import { steps } from '#src/stage/choreography.ts';

// One setting, two arrangements. The pass ends on the steered card the demo mounts in,
// which is the state the subject's pose requires (SPEC §6, §8).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=choice][data-mode=steered]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-public][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-private]', state: 'hidden' } },
  { assert: { selector: '[data-part=more]', state: 'visible' } },
  { wait: 600 },

  // The permissive answer needs no clicks at all, and the button never names it.
  { moveTo: '[data-part=confirm]' },
  { wait: 250 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-state=public]', state: 'visible' } },
  { wait: 1200 },

  // The private answer is two clicks further down, behind a disclosure.
  { moveTo: '[data-part=more]' },
  { wait: 250 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=opt-private]', state: 'visible' } },
  { assert: { selector: '[data-part=more]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=opt-private]' },
  { wait: 250 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=opt-private][aria-selected="true"]', state: 'visible' } },

  { moveTo: '[data-part=confirm]' },
  { wait: 250 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=readout][data-state=private]', state: 'visible' } },
  { wait: 1200 },

  // Same three answers, same weight, and the commit button says what it will do.
  { moveTo: '[data-part=mode-plain]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=choice][data-mode=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-private][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=more]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-state=pending]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=mode-steered]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=choice][data-mode=steered]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-private]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-state=pending]', state: 'visible' } },
  { wait: 900 },
]);
