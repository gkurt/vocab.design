import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The set fades in from mount, so the first reading of the guides waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=content][data-mode=title]', state: 'visible' } },
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { assert: { selector: '[data-part=guide-title]', state: 'visible' } },
  { assert: { selector: '[data-part=guide-action]', state: 'visible' } },
  { wait: 700 },

  // Out to action safe: the artwork is fine there, the text is not.
  { moveTo: '[data-part=seg-action]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=seg-action][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=content][data-mode=action]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=action]', state: 'visible' } },
  { wait: 1400 },

  // Laid out to the physical edge, where the set's own crop takes the ends off.
  { moveTo: '[data-part=seg-edge]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-mode=edge]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=edge]', state: 'visible' } },
  // The margin the set will crop is there whatever the layout decided to do about it.
  { assert: { selector: '[data-part=band]', state: 'visible' } },
  { wait: 1600 },

  // Each segment names an inset, so the way back is an inset too, not an undo.
  { moveTo: '[data-part=seg-title]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=content][data-mode=title]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=title]', state: 'visible' } },
  { wait: 700 },
]);
