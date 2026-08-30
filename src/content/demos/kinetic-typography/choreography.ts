import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, and the falling letters need their landing.
  { wait: 900 },
  { assert: { selector: '[data-part=phrase][data-mode=drop]', state: 'visible' } },
  { assert: { selector: '[data-part=word-drop]', state: 'visible' } },
  { wait: 800 },
  { assert: { selector: '[data-part=read]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names the treatment it reaches, and
  // every claim is made after the move it names has settled.
  { moveTo: '[data-part=seg-swell]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=phrase][data-mode=swell]', state: 'visible' } },
  { assert: { selector: '[data-part=word-swell]', state: 'visible' } },
  { moveTo: '[data-part=seg-stutter]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=phrase][data-mode=stutter]', state: 'visible' } },
  { assert: { selector: '[data-part=word-stutter]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=read][data-mode=stutter]', state: 'visible' } },
  { moveTo: '[data-part=seg-drop]' },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=phrase][data-mode=drop]', state: 'visible' } },
  { assert: { selector: '[data-part=word-drop]', state: 'visible' } },
  { wait: 700 },
]);
