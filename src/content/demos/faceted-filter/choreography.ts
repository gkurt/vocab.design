import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the first claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-shown="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=chips-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=count-boots]', state: 'visible' } },
  { wait: 500 },
  // A facet row only selects; the chips and Clear all own the way back out.
  { moveTo: '[data-part=facet-boots]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-shown="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=box-boots][aria-checked="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-boots]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=facet-under50]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-shown="2"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-under50]', state: 'visible' } },
  // Both boots under fifty are Fjordline, so the Tarn row would leave nothing and says so.
  { assert: { selector: '[data-part=facet-tarn][aria-disabled="true"]', state: 'visible' } },
  { wait: 1200 },
  // Price is a single-select group, so this replaces the band rather than adding one.
  { moveTo: '[data-part=facet-over100]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-shown="1"]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-over100]', state: 'visible' } },
  { assert: { selector: '[data-part=chip-under50]', state: 'hidden' } },
  { wait: 1200 },
  { moveTo: '[data-part=clear]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=results][data-shown="12"]', state: 'visible' } },
  { assert: { selector: '[data-part=chips-empty]', state: 'visible' } },
  { assert: { selector: '[data-part=box-boots][aria-checked="false"]', state: 'visible' } },
  { wait: 800 },
]);
