import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { moveTo: '[data-part=open]' },
  { click: true },
  { assert: { selector: '[data-part=dialog]', state: 'visible' } },
  { assert: { selector: '[data-part=confirm][aria-disabled="true"]', state: 'visible' } },
  { moveTo: '[data-part=guard-input]' },
  { click: true },
  { type: 'northwind' },
  { assert: { selector: '[data-part=guard][data-state=mismatch]', state: 'visible' } },
  { wait: 700 },
  { type: '-web' },
  { assert: { selector: '[data-part=guard][data-state=ready]', state: 'visible' } },
  { assert: { selector: '[data-part=confirm][data-ready]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=confirm]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=dialog]', state: 'hidden' } },
  { assert: { selector: '[data-part=gone]', state: 'visible' } },
  { wait: 1300 },
]);
