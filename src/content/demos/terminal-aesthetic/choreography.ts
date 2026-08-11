import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=terminal]', state: 'visible' } },
  { assert: { selector: '[data-part=prompt]', state: 'visible' } },
  { assert: { selector: '[data-part=output]', state: 'hidden' } },
  { moveTo: '[data-part=command]' },
  { wait: 450 },
  { type: 'sysinfo' },
  { wait: 600 },
  { press: 'Enter' },
  { wait: 600 },
  { assert: { selector: '[data-part=output][data-done]', state: 'visible' } },
  { wait: 1300 },
]);
