import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Below the fold at rest: no request has been made for these at all.
  { assert: { selector: '[data-part=shot-3][data-state=deferred]', state: 'visible' } },
  { assert: { selector: '[data-part=shot-5][data-state=deferred]', state: 'visible' } },
  { wait: 900 },
  // The one already on screen was fetched at mount, because it was needed at mount.
  { assert: { selector: '[data-part=shot-1][data-state=loaded]', state: 'visible' } },
  { moveTo: '[data-part=feed]' },
  { scroll: { y: 200 } },
  { wait: 1000 },
  { assert: { selector: '[data-part=shot-3][data-state=loaded]', state: 'visible' } },
  { assert: { selector: '[data-part=shot-5][data-state=deferred]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 220 } },
  { wait: 1000 },
  { assert: { selector: '[data-part=shot-5][data-state=loaded]', state: 'visible' } },
  { wait: 900 },
]);
