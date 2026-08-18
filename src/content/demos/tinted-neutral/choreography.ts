import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=ramp-tinted][data-hue=indigo]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-tinted][data-chroma="0.018"]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-neutral][data-chroma="0.000"]', state: 'visible' } },
  { assert: { selector: '[data-part=lstar-3]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one hue outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-teal]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ramp-tinted][data-hue=teal]', state: 'visible' } },
  { assert: { selector: '[data-part=card-tinted][data-hue=teal]', state: 'visible' } },
  // The pure ramp is untouched: still zero chroma, still the same six rungs.
  { assert: { selector: '[data-part=ramp-neutral][data-chroma="0.000"]', state: 'visible' } },
  { assert: { selector: '[data-part=card-neutral][data-hue=none]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-amber]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ramp-tinted][data-hue=amber]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-tinted][data-chroma="0.018"]', state: 'visible' } },
  { assert: { selector: '[data-part=chroma-tinted]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=ramp-tinted][data-hue=indigo]', state: 'visible' } },
  { assert: { selector: '[data-part=ramp-neutral][data-chroma="0.000"]', state: 'visible' } },
  { wait: 900 },
]);
