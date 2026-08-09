import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=prose][data-leading=normal]', state: 'visible' } },
  { wait: 800 },
  { moveTo: '[data-part=seg-tight]' },
  { click: true },
  { assert: { selector: '[data-part=prose][data-leading=tight]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-loose]' },
  { click: true },
  { assert: { selector: '[data-part=prose][data-leading=loose]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-normal]' },
  { click: true },
  { assert: { selector: '[data-part=prose][data-leading=normal]', state: 'visible' } },
  { wait: 900 },
]);
