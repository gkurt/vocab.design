import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=dropped-file]', state: 'hidden' } },
  // Carried across the panel and released off the zone: nothing accepts it there.
  { moveTo: '[data-part=file]' },
  { drag: { to: '[data-part=elsewhere]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=dropped-file]', state: 'hidden' } },
  { wait: 700 },
  // The same file, released over the region that says it will take it.
  { moveTo: '[data-part=file]' },
  { drag: { to: '[data-part=zone]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=dropped-file]', state: 'visible' } },
  { assert: { selector: '[data-part=uploads-empty]', state: 'hidden' } },
  // The drag is over, so the zone stops advertising that it would take one.
  { assert: { selector: '[data-part=zone][data-active]', state: 'hidden' } },
  { wait: 1400 },
]);
