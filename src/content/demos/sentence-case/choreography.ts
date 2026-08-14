import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=labels][data-case="sentence"]', state: 'visible' } },
  { assert: { selector: '[data-part=screen-title]', state: 'visible' } },
  { wait: 700 },
  // Capitalisation answers no pointer, so the cursor reads the panel the way a
  // reviewer would: the title, the label carrying a name, then the buttons.
  { moveTo: '[data-part=screen-title]' },
  { wait: 900 },
  { moveTo: '[data-part=row-mentions]' },
  { wait: 1000 },
  { assert: { selector: '[data-part=row-mentions]', state: 'visible' } },
  { moveTo: '[data-part=save]' },
  { wait: 900 },
  { assert: { selector: '[data-part=actions]', state: 'visible' } },
  { moveTo: '[data-part=rules]' },
  { wait: 900 },
  { assert: { selector: '[data-part=rules]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
