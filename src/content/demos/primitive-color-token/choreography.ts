import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=diagram][data-mode=light]', state: 'visible' } },
  { assert: { selector: '[data-part=prim-blue-500]', state: 'visible' } },
  { assert: { selector: '[data-part="role-color-action"][data-points="blue-500"]', state: 'visible' } },
  { assert: { selector: '[data-part="comp-button-bg"][data-resolves="blue-500"]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one theme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  // The role re-points and the component follows it, without either naming a new value.
  { assert: { selector: '[data-part=diagram][data-mode=dark]', state: 'visible' } },
  { assert: { selector: '[data-part="role-color-action"][data-points="blue-300"]', state: 'visible' } },
  { assert: { selector: '[data-part="comp-button-bg"][data-resolves="blue-300"]', state: 'visible' } },
  // The primitive scale is untouched: same names, same hexes, same rows.
  { assert: { selector: '[data-part=prim-blue-500]', state: 'visible' } },
  { assert: { selector: '[data-part=prim-blue-300]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=diagram][data-mode=light]', state: 'visible' } },
  { assert: { selector: '[data-part="role-color-surface"][data-points="white"]', state: 'visible' } },
  { wait: 900 },
]);
