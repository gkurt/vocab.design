import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=tab-results][data-active]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-tides]', state: 'hidden' } },
  // The familiar press first: it replaces the page, and the tab you were on is spent.
  { moveTo: '[data-part=link-parking]' },
  { wait: 400 },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tab-results][data-navigated]', state: 'visible' } },
  { wait: 900 },
  // The wheel press on a link: a tab arrives behind the one being read.
  { moveTo: '[data-part=link-tides]' },
  { wait: 400 },
  { middleClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tab-tides]', state: 'visible' } },
  { assert: { selector: '[data-part=link-tides][data-opened]', state: 'visible' } },
  // Focus never moved: the tab being read is still the active one.
  { assert: { selector: '[data-part=tab-results][data-active]', state: 'visible' } },
  { wait: 900 },
  // The same button's second job, on the tab it just opened.
  { moveTo: '[data-part=tab-tides]' },
  { wait: 400 },
  { middleClick: true },
  { wait: 600 },
  { assert: { selector: '[data-part=tab-tides]', state: 'hidden' } },
  { assert: { selector: '[data-part=tab-results][data-active]', state: 'visible' } },
  { wait: 1200 },
]);
