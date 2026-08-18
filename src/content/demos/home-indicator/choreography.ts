import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Mount: the content region stops at the reported inset, clear of the strip.
  { assert: { selector: '[data-part=strip][data-mode=inset]', state: 'visible' } },
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  { assert: { selector: '[data-part=pill]', state: 'visible' } },
  { wait: 1000 },
  // Content run to the bottom edge: the button now reaches under the indicator.
  { moveTo: '[data-part=seg-under]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=strip][data-mode=under]', state: 'visible' } },
  { assert: { selector: '[data-part=action]', state: 'visible' } },
  { wait: 1300 },
  // Full screen, where the bar dims and keeps the gesture anyway.
  { moveTo: '[data-part=seg-immersive]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=strip][data-mode=immersive]', state: 'visible' } },
  { assert: { selector: '[data-part=swipe]', state: 'visible' } },
  { wait: 1300 },
  // Back to the inset region, which is the arrangement that leaves nothing down there to lose.
  { moveTo: '[data-part=seg-inset]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=strip][data-mode=inset]', state: 'visible' } },
  { wait: 800 },
]);
