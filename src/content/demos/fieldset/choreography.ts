import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the grouped claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=delivery][data-mode=grouped]', state: 'visible' } },
  { assert: { selector: '[data-part=delivery-legend]', state: 'visible' } },
  { assert: { selector: '[data-part=billing-legend]', state: 'visible' } },
  { assert: { selector: '[data-part=announce][data-named="true"]', state: 'visible' } },
  { wait: 700 },
  // The picker names an absolute state, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-flat]' },
  { click: true },
  { wait: 700 },
  // The legend has left the accessibility tree with its pixels: same six controls, no group.
  { assert: { selector: '[data-part=delivery][data-mode=flat]', state: 'visible' } },
  { assert: { selector: '[data-part=delivery-legend]', state: 'hidden' } },
  { assert: { selector: '[data-part=billing-legend]', state: 'hidden' } },
  { assert: { selector: '[data-part=announce][data-named="false"]', state: 'visible' } },
  // The controls themselves never went anywhere, which is the point being made.
  { assert: { selector: '[data-part=delivery-street]', state: 'visible' } },
  { assert: { selector: '[data-part=billing-street]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-grouped]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=delivery][data-mode=grouped]', state: 'visible' } },
  { assert: { selector: '[data-part=delivery-legend]', state: 'visible' } },
  { assert: { selector: '[data-part=announce][data-named="true"]', state: 'visible' } },
  { wait: 800 },
]);
