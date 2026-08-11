import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ind-track]', state: 'visible' } },
  { assert: { selector: '[data-part=col-track][aria-sort=ascending]', state: 'visible' } },
  // The other sortable header keeps the arrow's room without claiming the sort.
  { assert: { selector: '[data-part=ind-plays]', state: 'hidden' } },
  { moveTo: '[data-part=sort-plays]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ind-plays]', state: 'visible' } },
  { assert: { selector: '[data-part=ind-track]', state: 'hidden' } },
  { assert: { selector: '[data-part=col-plays][aria-sort=ascending]', state: 'visible' } },
  { assert: { selector: '[data-part=row-ember][data-rank="1"]', state: 'visible' } },
  { wait: 1000 },
  // The same header again, which is the only way to show the other direction: the
  // arrow turning over is half of what it is there to say.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=col-plays][aria-sort=descending]', state: 'visible' } },
  { assert: { selector: '[data-part=row-low-tide][data-rank="1"]', state: 'visible' } },
  { wait: 1000 },
]);
