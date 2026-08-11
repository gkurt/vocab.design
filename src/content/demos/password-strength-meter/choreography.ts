import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=meter][data-strength=empty]', state: 'visible' } },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: 'summer' },
  { assert: { selector: '[data-part=meter][data-strength=weak]', state: 'visible' } },
  { wait: 1000 },
  { type: '2024' },
  { assert: { selector: '[data-part=meter][data-strength=fair]', state: 'visible' } },
  { wait: 1000 },
  { type: '!Kx7q' },
  { assert: { selector: '[data-part=meter][data-strength=strong]', state: 'visible' } },
  { assert: { selector: '[data-part=reading]', state: 'visible' } },
  { wait: 1400 },
]);
