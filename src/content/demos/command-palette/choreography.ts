import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=palette]', state: 'hidden' } },
  { moveTo: '[data-part=open-palette]' },
  { click: true },
  { wait: 320 },
  { assert: { selector: '[data-part=palette]', state: 'visible' } },
  { moveTo: '[data-part=palette-input]' },
  { click: true },
  { type: 'the' },
  { wait: 420 },
  { assert: { selector: '[data-part=cmd-theme]', state: 'visible' } },
  { assert: { selector: '[data-part=cmd-new]', state: 'hidden' } },
  { moveTo: '[data-part=cmd-theme]' },
  { click: true },
  { wait: 520 },
  { assert: { selector: '[data-part=palette]', state: 'hidden' } },
  { assert: { selector: '[data-part=theme][data-value=dark]', state: 'visible' } },
  { wait: 900 },
]);
