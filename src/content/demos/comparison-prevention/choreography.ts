import { steps } from '#src/stage/choreography.ts';

// The same three plans, published and then lined up. The pass ends on the published
// arrangement the demo mounts in, which is the state the subject's pose requires (SPEC §6).
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=plans][data-mode=prevented]', state: 'visible' } },
  // One tier priced by the year, one not priced at all: the asymmetry is the term.
  { assert: { selector: '[data-part=plan-team][data-billing=yearly]', state: 'visible' } },
  { assert: { selector: '[data-part=plan-scale][data-billing=quoted]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-answer=unknown]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=mode-comparable]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=plans][data-mode=comparable]', state: 'visible' } },
  { assert: { selector: '[data-part=plan-team][data-billing=monthly]', state: 'visible' } },
  { assert: { selector: '[data-part=plan-scale][data-billing=monthly]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-answer=team]', state: 'visible' } },
  { wait: 1600 },

  { moveTo: '[data-part=mode-prevented]' },
  { wait: 300 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=plans][data-mode=prevented]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-answer=unknown]', state: 'visible' } },
  { wait: 900 },
]);
