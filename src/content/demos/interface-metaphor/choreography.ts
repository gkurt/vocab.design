import { steps } from '#src/stage/choreography.ts';

// The page is carried into the folder by the borrowed gesture, then moved back by the
// literal one, and both renderings answer each move. Every destination is an absolute
// pick, and the pass ends on the inbox the specimen mounts in (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=desk][data-where="inbox"]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-page]', state: 'hidden' } },
  { wait: 500 },
  { moveTo: '[data-part=page]' },
  { drag: { to: '[data-part=folder]' } },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-where="archive"]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-page]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'hidden' } },
  { assert: { selector: '[data-part=readout][data-where="archive"]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=to-trash]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-where="trash"]', state: 'visible' } },
  { assert: { selector: '[data-part=trash-page]', state: 'visible' } },
  { assert: { selector: '[data-part=folder-page]', state: 'hidden' } },
  { wait: 1000 },
  { moveTo: '[data-part=to-inbox]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-where="inbox"]', state: 'visible' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 800 },
]);
