import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=ramp][data-hue=slate]', state: 'visible' } },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  // Every swatch repaints; the numbering, and what each number is for, does not move.
  { assert: { selector: '[data-part=ramp][data-hue=indigo]', state: 'visible' } },
  { wait: 1300 },
  { moveTo: '[data-part=seg-amber]' },
  { click: true },
  { assert: { selector: '[data-part=ramp][data-hue=amber]', state: 'visible' } },
  { wait: 1300 },
]);
