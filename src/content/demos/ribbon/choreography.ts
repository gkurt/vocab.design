import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the resting claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=band][data-tab=home]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-home][data-current]', state: 'visible' } },
  // Named groups and the size hierarchy inside one: the large command plus the small ones.
  { assert: { selector: '[data-part=label-clipboard]', state: 'visible' } },
  { assert: { selector: '[data-part=big-clipboard]', state: 'visible' } },
  { assert: { selector: '[data-part=group-paragraph]', state: 'visible' } },
  { assert: { selector: '[data-part=group-tables]', state: 'hidden' } },
  { wait: 700 },

  // A tab swaps the whole band: different groups, same surface, same height.
  { moveTo: '[data-part=tab-insert]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=band][data-tab=insert]', state: 'visible' } },
  { assert: { selector: '[data-part=tab-insert][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=group-tables]', state: 'visible' } },
  { assert: { selector: '[data-part=label-media]', state: 'visible' } },
  { assert: { selector: '[data-part=group-clipboard]', state: 'hidden' } },
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { wait: 900 },

  // A tab carrying fewer groups leaves the band exactly as tall as it was.
  { moveTo: '[data-part=tab-layout]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=band][data-tab=layout]', state: 'visible' } },
  { assert: { selector: '[data-part=group-arrange]', state: 'visible' } },
  { assert: { selector: '[data-part=group-tables]', state: 'hidden' } },
  { assert: { selector: '[data-part=big-setup]', state: 'visible' } },
  { wait: 900 },

  // Back to the tab the window rests on.
  { moveTo: '[data-part=tab-home]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=band][data-tab=home]', state: 'visible' } },
  { assert: { selector: '[data-part=group-clipboard]', state: 'visible' } },
  { wait: 800 },
]);
