import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Nothing between the badge and the page is positioned, so the offsets skip two ancestors.
  { assert: { selector: '[data-part=badge][data-anchor=page][data-position=absolute]', state: 'visible' } },
  { assert: { selector: '[data-part=card]', state: 'visible' } },
  { wait: 900 },
  // The badge's own rules never change: promoting an ancestor is what moves it.
  { moveTo: '[data-part=seg-card]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-anchor=card][data-position=absolute]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-cell]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-anchor=cell]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict]', state: 'visible' } },
  { wait: 1000 },
  // The surprising one: a transform, with no position at all, catches even a fixed badge.
  { moveTo: '[data-part=seg-transform]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-anchor=transform][data-position=fixed]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-page]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=badge][data-anchor=page][data-position=absolute]', state: 'visible' } },
  { wait: 800 },
]);
