import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=key-esc]', state: 'visible' } },
  { assert: { selector: '[data-part=row-save]', state: 'visible' } },
  { wait: 800 },
  // The row is what you activate; the keycap beside it only says there is a
  // faster way, so hovering one changes nothing about the other.
  { moveTo: '[data-part=row-save]' },
  { wait: 700 },
  { assert: { selector: '[data-part=row-save]', state: 'visible' } },
  { moveTo: '[data-part=key-esc]' },
  { wait: 700 },
  { assert: { selector: '[data-part=key-esc]', state: 'visible' } },
  { assert: { selector: '[data-part=menu]', state: 'visible' } },
  { wait: 600 },
]);
