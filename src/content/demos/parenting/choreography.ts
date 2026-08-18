import { steps } from '#src/stage/choreography.ts';

// The parent's move runs for 1500 ms after a 60 ms beat and the slowest loose sibling takes 1950, so
// every mid-flight claim sits near the middle of the parent's window and every posed claim is given
// the whole run plus its settle.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=card][data-move=slide]', state: 'visible' } },
  { assert: { selector: '[data-part=child-1]', state: 'visible' } },
  { assert: { selector: '[data-part=child-3]', state: 'visible' } },
  { assert: { selector: '[data-part=loose-1]', state: 'visible' } },
  { assert: { selector: '[data-part=loose-3]', state: 'visible' } },
  { wait: 1800 },
  { assert: { selector: '[data-part=card][data-move=slide][data-state=posed]', state: 'visible' } },

  // The same journey as a scale, where the parented group spreads and the loose one does not.
  { moveTo: '[data-part=seg-scale]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=card][data-move=scale][data-state=moving]', state: 'visible' } },
  { wait: 2200 },
  { assert: { selector: '[data-part=card][data-move=scale][data-state=posed]', state: 'visible' } },
  { assert: { selector: '[data-part=child-2]', state: 'visible' } },

  { moveTo: '[data-part=replay]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=card][data-state=moving]', state: 'visible' } },
  { wait: 2200 },
  { assert: { selector: '[data-part=card][data-state=posed]', state: 'visible' } },

  { moveTo: '[data-part=seg-slide]' },
  { click: true },
  { wait: 2600 },
  { assert: { selector: '[data-part=card][data-move=slide][data-state=posed]', state: 'visible' } },
  { wait: 700 },
]);
