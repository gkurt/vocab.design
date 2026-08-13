import { steps } from '#src/stage/choreography.ts';

/**
 * The walk down the form with both groups named, then the same walk with the radio set's name
 * taken away. The address fieldset is untouched by the switch, which is the control in the
 * experiment. Each segment reaches its own build and the walk clamps at the last stop, so a
 * pass joined halfway still ends where a whole one does (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=speed][data-mode=labelled]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state="street-named"]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=voice][data-state="postcode-named"]', state: 'visible' } },
  { wait: 500 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=voice][data-state="standard-named"]', state: 'visible' } },
  { assert: { selector: '[data-part=stop-standard][data-sim-focus]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-bare]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=speed][data-mode=bare]', state: 'visible' } },
  { assert: { selector: '[data-part=voice][data-state="street-named"]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=next]' },
  { click: true },
  { wait: 450 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=voice][data-state="standard-unnamed"]', state: 'visible' } },
  { wait: 1100 },
]);
