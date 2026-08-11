import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=bubble-sent]', state: 'visible' } },
  { moveTo: '[data-part=composer-input]' },
  { type: 'Caption held at 12.' },
  { moveTo: '[data-part=send]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=bubble-new]', state: 'visible' } },
]);
