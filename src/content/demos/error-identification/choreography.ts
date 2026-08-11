import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=error]', state: 'hidden' } },
  { moveTo: '[data-part=submit]' },
  { click: true },
  { wait: 500 },
  // The failure is named in text, and the field says so in its own state.
  { assert: { selector: '[data-part=field][data-state=invalid]', state: 'visible' } },
  { assert: { selector: '[data-part=error]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-grey]' },
  { click: true },
  { wait: 700 },
  // Colour drained: the sentence and the icon are still doing the identifying.
  { assert: { selector: '[data-part=form][data-mode=grey]', state: 'visible' } },
  { assert: { selector: '[data-part=error]', state: 'visible' } },
  { assert: { selector: '[data-part=mark]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-colour]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=form][data-mode=colour]', state: 'visible' } },
  { assert: { selector: '[data-part=field][data-state=invalid]', state: 'visible' } },
  { wait: 700 },
]);
