import { steps } from '#src/stage/choreography.ts';

/**
 * Both knobs the widget offers, worked in turn. Each segment reaches an absolute state rather than
 * toggling one (SPEC §8), and the claim every time is the pair: the page changed, and the computed
 * name of the unlabelled control did not.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=widget]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-mode=default][data-name=empty]', state: 'visible' } },
  { wait: 800 },

  { moveTo: '[data-part=seg-text]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-mode=text]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-mode=text][data-name=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=text]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-contrast]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-mode=contrast]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-mode=contrast][data-name=empty]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=contrast]', state: 'visible' } },
  { wait: 1800 },

  { moveTo: '[data-part=seg-default]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-mode=default]', state: 'visible' } },
  { assert: { selector: '[data-part=name][data-mode=default][data-name=empty]', state: 'visible' } },
  { wait: 900 },
]);
