import { steps } from '#src/stage/choreography.ts';

/**
 * Three absolute passes over one file (SPEC §8): the lexical colouring it mounts in, the
 * plain version that says what the colour was buying, and the semantic pass that overrules
 * the grammar on the bare names. The parameter's own `data-role` is what proves the
 * overrule, since it is the token whose answer changed rather than the block around it.
 */
export default steps([
  { wait: 800 },
  { assert: { selector: '[data-part=code][data-mode=syntax]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-string][data-lit]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-name][data-role=name]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=syntax]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-plain]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-plain][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=code][data-mode=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=plain]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-string][data-lit]', state: 'hidden' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-semantic]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=seg-semantic][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=code][data-mode=semantic]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-name][data-role=param]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-string][data-lit]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=seg-syntax]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=code][data-mode=syntax]', state: 'visible' } },
  { assert: { selector: '[data-part=tok-name][data-role=name]', state: 'visible' } },
  { wait: 800 },
]);
