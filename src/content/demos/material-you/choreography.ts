import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=panel]', state: 'visible' } },
  { assert: { selector: '[data-part=wall-coast][aria-selected="true"]', state: 'visible' } },
  { moveTo: '[data-part=wall-dune]' },
  { wait: 400 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=wall-dune][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=cta]', state: 'visible' } },
  { moveTo: '[data-part=wall-fern]' },
  { wait: 400 },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=wall-fern][aria-selected="true"]', state: 'visible' } },
  { wait: 900 },
]);
