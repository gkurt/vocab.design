import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=lig-on][data-word=waffle]', state: 'visible' } },
  { assert: { selector: '[data-part=lig-off]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=seg-office]' },
  { click: true },
  { assert: { selector: '[data-part=lig-on][data-word=office]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-stiff]' },
  { click: true },
  { assert: { selector: '[data-part=lig-on][data-word=stiff]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-waffle]' },
  { click: true },
  { assert: { selector: '[data-part=lig-on][data-word=waffle]', state: 'visible' } },
  { wait: 900 },
]);
