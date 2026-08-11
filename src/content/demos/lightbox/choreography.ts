import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=lightbox]', state: 'hidden' } },
  { moveTo: '[data-part=thumb-3]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=lightbox][data-index="3"]', state: 'visible' } },
  { wait: 900 },
  // The arrows step the counter to absolute indices, not past whatever was there.
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=lightbox][data-index="4"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=prev]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=lightbox][data-index="3"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=close]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=lightbox]', state: 'hidden' } },
  { wait: 900 },
]);
