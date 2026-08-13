import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=canvas][data-view=middle]', state: 'visible' } },
  { moveTo: '[data-part=canvas]' },
  { wait: 400 },
  // Pushing the sheet toward the top left brings the bottom right of the survey into
  // view. The drag overshoots the room there is, so the clamp makes the landing absolute.
  { drag: { to: '[data-part=corner-nw]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-view=southeast]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=canvas]' },
  { wait: 400 },
  { drag: { to: '[data-part=corner-se]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=canvas][data-view=northwest]', state: 'visible' } },
  { wait: 1000 },
  // The keyboard reaches the same content: Home returns the view to where it started.
  { moveTo: '[data-part=canvas]' },
  { wait: 300 },
  { press: 'Home' },
  { wait: 500 },
  { assert: { selector: '[data-part=canvas][data-view=middle]', state: 'visible' } },
  { wait: 900 },
]);
