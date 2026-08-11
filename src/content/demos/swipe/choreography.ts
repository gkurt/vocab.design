import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=pager][data-page="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-harbour][data-current]', state: 'visible' } },
  { moveTo: '[data-part=grip-right]' },
  { wait: 400 },
  // Right edge to left edge: a stroke well past the commit distance, so it carries
  // whatever page the surface was on.
  { drag: { to: '[data-part=grip-left]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=pager][data-page="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=dot-lighthouse][data-current]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=grip-right]' },
  { wait: 300 },
  { drag: { to: '[data-part=grip-left]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=pager][data-page="3"]', state: 'visible' } },
  { wait: 900 },
  // The other direction, which is a page back rather than a dismissal.
  { moveTo: '[data-part=grip-left]' },
  { wait: 300 },
  { drag: { to: '[data-part=grip-right]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=pager][data-page="2"]', state: 'visible' } },
  { wait: 1000 },
]);
