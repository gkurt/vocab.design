import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=picker][data-hue="210"]', state: 'visible' } },
  { assert: { selector: '[data-part=hex]', state: 'visible' } },
  // A press on the field lands on the point pressed: the centre is half saturation
  // and half brightness however the pass began (SPEC §8).
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 380 },
  { assert: { selector: '[data-part=picker][data-sat="50"][data-val="50"]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=hue-thumb]' },
  { drag: { to: '[data-part=stop-hue-120]' } },
  { wait: 420 },
  { assert: { selector: '[data-part=picker][data-hue="120"]', state: 'visible' } },
  { wait: 800 },
  // Dragging the thumb out of the bottom of the field reaches the field's own edge:
  // no brightness left, whatever the hue and saturation say.
  { moveTo: '[data-part=field-thumb]' },
  { drag: { to: '[data-part=stop-hue-240]' } },
  { wait: 420 },
  { assert: { selector: '[data-part=picker][data-val="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=picker][data-value="#000000"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=field]' },
  { click: true },
  { wait: 380 },
  { assert: { selector: '[data-part=picker][data-sat="50"][data-val="50"]', state: 'visible' } },
  { assert: { selector: '[data-part=picker][data-hue="120"]', state: 'visible' } },
  { wait: 900 },
]);
