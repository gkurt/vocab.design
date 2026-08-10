import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=field][data-state=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-kind=hint]', state: 'visible' } },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: 'SW1A' },
  { wait: 600 },
  // The field is asked to commit, which is the moment it is entitled to complain.
  { moveTo: '[data-part=continue]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=field][data-state=invalid]', state: 'visible' } },
  { assert: { selector: '[data-part=help][data-kind=error]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=input]' },
  { click: true },
  { type: ' 2AA' },
  { wait: 600 },
  // Typing answers the complaint, so the line goes back to being a hint.
  { assert: { selector: '[data-part=help][data-kind=hint]', state: 'visible' } },
  { moveTo: '[data-part=continue]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=field][data-state=accepted]', state: 'visible' } },
  { assert: { selector: '[data-part=committed][data-state=sent]', state: 'visible' } },
  { wait: 1600 },
]);
