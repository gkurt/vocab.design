import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=scroller][data-mode=light]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-verdict=pass]', state: 'visible' } },
  { assert: { selector: '[data-part=thumb]', state: 'visible' } },
  { assert: { selector: '[data-part=declaration]', state: 'visible' } },
  { wait: 1000 },
  // A real scroller, so the thumb the two colours paint is one that reports a real position.
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 90 } },
  { wait: 600 },
  { assert: { selector: '[data-part=scroller][data-scrolled]', state: 'visible' } },
  { wait: 1000 },
  // Each segment names one theme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scroller][data-mode=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-verdict=pass]', state: 'visible' } },
  { wait: 1400 },
  // Brand is where the stated pair and the floor part company.
  { moveTo: '[data-part=seg-brand]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scroller][data-mode=brand]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-verdict=low]', state: 'visible' } },
  { assert: { selector: '[data-part=ratio]', state: 'visible' } },
  { wait: 1600 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=scroller][data-mode=light]', state: 'visible' } },
  { assert: { selector: '[data-part=scroller][data-verdict=pass]', state: 'visible' } },
  { wait: 900 },
]);
