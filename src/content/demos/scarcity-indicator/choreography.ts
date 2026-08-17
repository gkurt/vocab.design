import { steps } from '#src/stage/choreography.ts';

// The stock is what changes; the line only reports it. Plenty has nothing to say, zero
// says sold out, and the pass ends on the low state the specimen mounts in (SPEC §8).
export default steps([
  { wait: 600 },
  { assert: { selector: '[data-part=stock-line][data-level="low"]', state: 'visible' } },
  { assert: { selector: '[data-part=inventory][data-count="3"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=level-plenty]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stock-line]', state: 'hidden' } },
  { assert: { selector: '[data-part=inventory][data-count="24"]', state: 'visible' } },
  { assert: { selector: '[data-part=buy]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=level-out]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stock-line][data-level="out"]', state: 'visible' } },
  { assert: { selector: '[data-part=buy][aria-disabled="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=inventory][data-count="0"]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=level-low]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=stock-line][data-level="low"]', state: 'visible' } },
  { assert: { selector: '[data-part=inventory][data-count="3"]', state: 'visible' } },
  { wait: 800 },
]);
