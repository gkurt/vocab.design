import { steps } from '#src/stage/choreography.ts';

// Entering and leaving are separate controls rather than one toggle, so a pass that is
// resumed or fast-forwarded lands in the mode it asked for (SPEC §8). The badges are the
// half of the announcement that survives reduced motion, so they are what is asserted.
export default steps([
  { assert: { selector: '[data-part=grid][data-mode=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'hidden' } },
  { moveTo: '[data-part=hold]' },
  { wait: 450 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=grid][data-mode=editing]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-8]', state: 'visible' } },
  { wait: 2400 },
  { moveTo: '[data-part=done]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=grid][data-mode=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=badge-1]', state: 'hidden' } },
  { assert: { selector: '[data-part=app-1]', state: 'visible' } },
  { wait: 900 },
]);
