import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=poster]', state: 'visible' } },
  { assert: { selector: '[data-part=guides]', state: 'visible' } },
  { assert: { selector: '[data-part=numeral]', state: 'visible' } },
  { wait: 800 },
  // A composition answers no pointer: the cursor only reads it in the order the
  // hierarchy claims, headline first, then the numeral, then the copy on its column.
  { moveTo: '[data-part=headline]' },
  { wait: 1000 },
  { moveTo: '[data-part=numeral]' },
  { wait: 1000 },
  { moveTo: '[data-part=copy]' },
  { wait: 900 },
  { moveTo: '[data-part=rule]' },
  { wait: 800 },
  { assert: { selector: '[data-part=rule]', state: 'visible' } },
  { assert: { selector: '[data-part=meta]', state: 'visible' } },
  { wait: 600 },
]);
