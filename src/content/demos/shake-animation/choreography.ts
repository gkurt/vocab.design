import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=message][data-tone=idle]', state: 'visible' } },
  { moveTo: '[data-part=code]' },
  { click: true },
  { type: '409117' },
  { moveTo: '[data-part=verify]' },
  { click: true },
  // Past the 420ms recoil, so the claim is about the state it lands in.
  { wait: 800 },
  { assert: { selector: '[data-part=message][data-tone=reject]', state: 'visible' } },
  { moveTo: '[data-part=code]' },
  { click: true },
  { type: '284015' },
  { moveTo: '[data-part=verify]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=message][data-tone=accept]', state: 'visible' } },
  { wait: 500 },
]);
