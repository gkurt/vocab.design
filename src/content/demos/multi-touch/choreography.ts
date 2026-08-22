import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-gesture=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-last="0"]', state: 'visible' } },
  { moveTo: '[data-part=canvas]' },
  { wait: 500 },
  // Two contacts: the pair spreads and the picture follows it.
  { pinch: { fingers: 2, scale: 1.9 } },
  { wait: 700 },
  { assert: { selector: '[data-part=canvas][data-last="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-scale="1.90"]', state: 'visible' } },
  { wait: 900 },
  // Three contacts on the same surface, spreading exactly as the pair did. The count is
  // what changed, so the zoom must not move: that refusal IS the term.
  { pinch: { fingers: 3, scale: 1.6 } },
  { wait: 700 },
  { assert: { selector: '[data-part=canvas][data-last="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=canvas][data-scale="1.90"]', state: 'visible' } },
  { wait: 1200 },
]);
