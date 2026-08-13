import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=fallback][data-tuned=off]', state: 'visible' } },
  { assert: { selector: '[data-part=line-web]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-tuned]' },
  { click: true },
  { wait: 500 },
  // The stand-in has been scaled until its lowercase reaches the rule the real face left.
  { assert: { selector: '[data-part=fallback][data-tuned=on]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-declared]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=fallback][data-tuned=off]', state: 'visible' } },
  { wait: 900 },
]);
