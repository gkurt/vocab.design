import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  // Mounted arranged, because an arrangement nobody computed is the counter-example rather
  // than the term: ranked by dependency, every edge points the same way.
  { assert: { selector: '[data-part=graph][data-layout=layered]', state: 'visible' } },
  { assert: { selector: '[data-part=cost][data-moved="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=node-d]', state: 'visible' } },
  { wait: 800 },
  // The same six nodes as a hand dropped them: two edges cross and no direction reads.
  { moveTo: '[data-part=seg-dropped]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=graph][data-layout=dropped]', state: 'visible' } },
  { assert: { selector: '[data-part=cost][data-moved="6"]', state: 'visible' } },
  { wait: 1000 },
  // Radial hangs the neighbours off the busiest node, and moves all six again.
  { moveTo: '[data-part=seg-radial]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=graph][data-layout=radial]', state: 'visible' } },
  { assert: { selector: '[data-part=cost][data-moved="6"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-force]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=graph][data-layout=force]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-force][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
]);
