import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=stack]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-far]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-mid]', state: 'visible' } },
  { assert: { selector: '[data-part=panel-near]', state: 'visible' } },
  // The panels answer no pointer: depth is the whole claim and it is there at rest,
  // so the stack is read rather than toured.
  { wait: 1600 },
  // The pills do answer one, and lighting up under an unsteady gaze is what they are
  // sized for, so those are the only two things the cursor visits.
  { moveTo: '[data-part=play]' },
  { wait: 900 },
  { assert: { selector: '[data-part=play][data-hovered]', state: 'visible' } },
  { moveTo: '[data-part=later]' },
  { wait: 800 },
  { assert: { selector: '[data-part=later][data-hovered]', state: 'visible' } },
  { wait: 600 },
]);
