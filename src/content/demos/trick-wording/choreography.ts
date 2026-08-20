import { steps } from '#src/stage/choreography.ts';

// The same untick twice, under two sentences. The pass ends on the tricked wording the
// demo mounts in, which is the state the subject's pose requires (SPEC §6, §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=label][data-mode=tricked]', state: 'visible' } },
  { assert: { selector: '[data-part=effect][data-emails=on]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=box]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  // The sentence offered unticking as a way to keep the emails. It stopped them.
  { assert: { selector: '[data-part=effect][data-emails=off]', state: 'visible' } },
  { assert: { selector: '[data-part=box][aria-checked="false"]', state: 'visible' } },
  { wait: 1400 },

  { moveTo: '[data-part=mode-plain]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=label][data-mode=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=effect][data-emails=on]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=box]' },
  { wait: 350 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=effect][data-emails=off]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=mode-tricked]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=label][data-mode=tricked]', state: 'visible' } },
  { assert: { selector: '[data-part=effect][data-emails=on]', state: 'visible' } },
  { wait: 1000 },
]);
