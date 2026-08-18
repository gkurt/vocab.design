import { steps } from '#src/stage/choreography.ts';

/**
 * The one aesthetic specimen with something to do rather than something to look at. The
 * cursor presses the control, which squashes for the length of the press and springs back,
 * then drags it toward the socket, where the deformation is held for the whole hold. Neither
 * of those states is asserted mid-flight: a press lasts a beat and a drag ends the moment the
 * step does, so the proof of the three states is the states row, which poses them at once and
 * can be judged at rest.
 */
export default steps([
  { wait: 450 },
  { assert: { selector: '[data-part=squish]', state: 'visible' } },
  { assert: { selector: '[data-part=states]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=squish]' },
  { wait: 500 },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=squish]', state: 'visible' } },
  { drag: { to: '[data-part=socket]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=socket]', state: 'visible' } },
  { assert: { selector: '[data-part=ground]', state: 'visible' } },
  { moveTo: '[data-part=state-dragged]' },
  { wait: 850 },
  { assert: { selector: '[data-part=state-rest]', state: 'visible' } },
  { assert: { selector: '[data-part=state-pressed][data-pressed]', state: 'visible' } },
  { assert: { selector: '[data-part=state-dragged][data-pressed]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 600 },
]);
