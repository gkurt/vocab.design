import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to settle.
  { wait: 500 },
  { assert: { selector: '[data-part=tab-overview][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-overview]', state: 'visible' } },
  // A pointer picks a label, and the region beneath it changes: the panel is the term.
  { moveTo: '[data-part=tab-amenities]' },
  { wait: 300 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=tab-amenities][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-amenities]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-overview]', state: 'hidden' } },
  { wait: 900 },
  // The whole row is one tab stop, so movement inside it belongs to the arrow keys.
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=tab-rules][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-rules]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-amenities][aria-selected="true"]', state: 'hidden' } },
  { wait: 900 },
]);
