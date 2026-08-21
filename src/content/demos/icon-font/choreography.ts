import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=glyphs]', state: 'visible' } },
  { assert: { selector: '[data-part=markup]', state: 'visible' } },
  { assert: { selector: '[data-part=failure]', state: 'visible' } },
  { assert: { selector: '[data-part=announced]', state: 'visible' } },
  { wait: 900 },
  // Each addressing mode is asked for by name, so no step depends on the state it
  // finds and the specimen is left on the one it mounted in.
  { moveTo: '[data-part=seg-codepoint]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=exhibit][data-mode="codepoint"]', state: 'visible' } },
  // The glyphs are unchanged and everything underneath them is not, which is the term.
  { wait: 1200 },
  { moveTo: '[data-part=seg-ligature]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=exhibit][data-mode="ligature"]', state: 'visible' } },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { wait: 800 },
]);
