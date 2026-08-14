import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=glyphs]', state: 'visible' } },
  { assert: { selector: '[data-part=markup]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=glyph-star]' },
  { wait: 800 },
  // Each addressing mode is asked for by name, so no step depends on the state it
  // finds and the specimen is left on the one it mounted in.
  { moveTo: '[data-part=seg-codepoint]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=exhibit][data-mode="codepoint"]', state: 'visible' } },
  { moveTo: '[data-part=failure]' },
  { wait: 900 },
  { assert: { selector: '[data-part=failure]', state: 'visible' } },
  { assert: { selector: '[data-part=announced]', state: 'visible' } },
  { moveTo: '[data-part=seg-ligature]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=exhibit][data-mode="ligature"]', state: 'visible' } },
  { moveTo: '[data-part=caption]' },
  { wait: 800 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
]);
