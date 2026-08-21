import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=fragment]', state: 'visible' } },
  { assert: { selector: '[data-part=link-archive][data-visited]', state: 'hidden' } },
  { moveTo: '[data-part=link-archive]' },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  // Following the link is the one thing the fragment does: the rest of the claim is
  // the default paint, which is read at rest rather than pointed at.
  { assert: { selector: '[data-part=link-archive][data-visited]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 1100 },
]);
