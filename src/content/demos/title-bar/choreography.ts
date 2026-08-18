import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the classic claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-register=classic]', state: 'visible' } },
  { assert: { selector: '[data-part=title][data-place=centre]', state: 'visible' } },
  { assert: { selector: '[data-part=tools][data-in=row]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-register=classic]', state: 'visible' } },
  { wait: 600 },

  // Unified: the same strip takes the document's tools in beside the window's name.
  { moveTo: '[data-part=seg-unified]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-register=unified]', state: 'visible' } },
  { assert: { selector: '[data-part=tools][data-in=bar]', state: 'visible' } },
  { assert: { selector: '[data-part=title][data-place=left]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-register=unified]', state: 'visible' } },
  { wait: 900 },

  // Inactive: the strip dims, the document under it does not.
  { moveTo: '[data-part=seg-inactive]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-register=inactive]', state: 'visible' } },
  { assert: { selector: '[data-part=tools][data-in=row]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-register=inactive]', state: 'visible' } },
  { wait: 900 },

  // Back to the classic bar, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-classic]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=bar][data-register=classic]', state: 'visible' } },
  { assert: { selector: '[data-part=title][data-place=centre]', state: 'visible' } },
  { wait: 800 },
]);
