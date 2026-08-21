import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=opt-standard][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-express][aria-checked="true"]', state: 'hidden' } },
  // One tab stop for the whole group, so the arrows do the moving, and inside a radio
  // group the arrow chooses as it moves.
  { moveTo: '[data-part=group]' },
  { wait: 400 },
  { press: 'ArrowDown' },
  { wait: 450 },
  { assert: { selector: '[data-part=opt-express][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-standard][aria-checked="true"]', state: 'hidden' } },
  { wait: 1000 },
  // A pointer picks outright, and exclusivity holds either way it was reached.
  { moveTo: '[data-part=opt-collect]' },
  { wait: 300 },
  { click: true },
  { wait: 450 },
  { assert: { selector: '[data-part=opt-collect][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=opt-express][aria-checked="true"]', state: 'hidden' } },
  { assert: { selector: '[data-part=opt-standard][aria-checked="true"]', state: 'hidden' } },
  { wait: 900 },
]);
