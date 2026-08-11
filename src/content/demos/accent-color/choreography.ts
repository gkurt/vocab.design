import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=panel][data-accent=indigo]', state: 'visible' } },
  { moveTo: '[data-part=swatch-teal]' },
  { click: true },
  // One property moves; the switch, the selected chip and the primary button follow it.
  { assert: { selector: '[data-part=panel][data-accent=teal]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=swatch-crimson]' },
  { click: true },
  { assert: { selector: '[data-part=panel][data-accent=crimson]', state: 'visible' } },
  { wait: 1300 },
]);
