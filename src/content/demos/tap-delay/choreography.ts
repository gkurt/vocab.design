import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=legacy][data-fired]', state: 'hidden' } },
  { assert: { selector: '[data-part=modern][data-fired]', state: 'hidden' } },
  // The old rule: the tap lands, the window runs, and only then is a click dispatched.
  { moveTo: '[data-part=legacy]' },
  { wait: 400 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=legacy][data-fired]', state: 'visible' } },
  { assert: { selector: '[data-part=legacy][data-delay="300"]', state: 'visible' } },
  { wait: 1100 },
  // The same tap on a page that has given up double tap to zoom.
  { moveTo: '[data-part=modern]' },
  { wait: 400 },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=modern][data-fired]', state: 'visible' } },
  { assert: { selector: '[data-part=modern][data-delay="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=legacy][data-fired]', state: 'hidden' } },
  { wait: 1000 },
]);
