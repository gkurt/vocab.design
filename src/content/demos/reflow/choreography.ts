import { steps } from '#src/stage/choreography.ts';

/**
 * One direction of scrolling, then two. The sideways drag in the failing state is the
 * criterion being broken, shown rather than described. Each segment reaches its own state
 * (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=readout][data-state=reflow]', state: 'visible' } },
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 70 } },
  { wait: 600 },
  { assert: { selector: '[data-part=card-b]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-state=reflow]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=seg-fixed]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-state=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=fixed]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=viewport]' },
  { scroll: { x: 170 } },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-state=fixed]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-reflow]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=readout][data-state=reflow]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-case=reflow]', state: 'visible' } },
  { wait: 1000 },
]);
