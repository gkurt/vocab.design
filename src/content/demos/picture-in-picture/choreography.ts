import { steps } from '#src/stage/choreography.ts';

export default steps([
  // At rest the video is in the article and there is no floating window.
  { assert: { selector: '[data-part=slot][data-state=inline]', state: 'visible' } },
  { assert: { selector: '[data-part=mini]', state: 'hidden' } },
  { moveTo: '[data-part=pop]' },
  { click: true },
  { wait: 800 },
  // Popped out: the window floats over the page and the slot it left keeps its size.
  { assert: { selector: '[data-part=mini][data-corner=br]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-state=popped]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-tl]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=mini][data-corner=tl]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-bl]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=mini][data-corner=bl]', state: 'visible' } },
  { wait: 900 },
  // Closing is the window's own control, and the article gets its video back.
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=mini]', state: 'hidden' } },
  { assert: { selector: '[data-part=slot][data-state=inline]', state: 'visible' } },
  { wait: 800 },
]);
