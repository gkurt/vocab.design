import { steps } from '#src/stage/choreography.ts';

// A remote and nothing else. Each press moves the highlight one app along the row and the band
// changes to the app that now holds it, which is the whole claim. The band's own `data-app`
// qualifies every assert, so a claim can only pass when the surface really did change hands, and
// the middle app is the one that fills it with sectioned content rather than a poster.
export default steps([
  { wait: 520 },
  { assert: { selector: '[data-part=shelf][data-app=ridgeline]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-0][data-focused]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-title-ridgeline]', state: 'visible' } },

  { moveTo: '[data-part=screen]' },
  { wait: 400 },
  { press: 'ArrowRight' },
  { wait: 650 },
  { assert: { selector: '[data-part=shelf][data-app=kitchen]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-1][data-focused]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-title-ridgeline]', state: 'hidden' } },
  { wait: 1500 },

  { press: 'ArrowRight' },
  { wait: 650 },
  { assert: { selector: '[data-part=shelf][data-app=nocturne]', state: 'visible' } },
  { assert: { selector: '[data-part=banner-title-nocturne]', state: 'visible' } },
  { assert: { selector: '[data-part=item-2]', state: 'hidden' } },
  { wait: 1500 },

  { press: 'ArrowLeft' },
  { wait: 550 },
  { press: 'ArrowLeft' },
  { wait: 700 },
  { assert: { selector: '[data-part=shelf][data-app=ridgeline]', state: 'visible' } },
  { assert: { selector: '[data-part=tile-0][data-focused]', state: 'visible' } },
  { wait: 900 },
]);
