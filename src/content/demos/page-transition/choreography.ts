import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=slot][data-route=list]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-style=slide]', state: 'visible' } },
  { moveTo: '[data-part=row-harbour]' },
  { click: true },
  // Judged during the move, well inside the 380 ms travel.
  { assert: { selector: '[data-part=slot][data-state=moving]', state: 'visible' } },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-route=detail]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-dir=forward]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-state=settled]', state: 'visible' } },
  { wait: 600 },
  // The browser's own back control: the same move, run the other way.
  { moveTo: '[data-part=back]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=slot][data-route=list]', state: 'visible' } },
  { assert: { selector: '[data-part=slot][data-dir=back]', state: 'visible' } },
  { wait: 500 },
  // The same navigation drawn a second way. Switching style is instrumentation, not a
  // navigation, so it re-poses instead of playing.
  { moveTo: '[data-part=style-fade]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=slot][data-style=fade]', state: 'visible' } },
  { moveTo: '[data-part=row-harbour]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot][data-route=detail]', state: 'visible' } },
  // In crossfade the leaving route really is gone rather than parked off the edge.
  { assert: { selector: '[data-part=screen-detail]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-list]', state: 'hidden' } },
  { wait: 700 },
]);
