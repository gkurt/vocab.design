import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The page fades in from mount, so the first reading of the stacked order waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=promo][data-order=choreographed]', state: 'visible' } },
  { assert: { selector: '[data-part=body]', state: 'visible' } },
  { wait: 600 },

  // Where it came from: two columns, promo in the sidebar beside the article.
  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-order=columns]', state: 'visible' } },
  { assert: { selector: '[data-part=rail]', state: 'visible' } },
  { wait: 800 },

  // Collapsed in source order: the promo lands above the article body.
  { moveTo: '[data-part=seg-source]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-order=source]', state: 'visible' } },
  { assert: { selector: '[data-part=title]', state: 'visible' } },
  { wait: 800 },

  // Choreographed: the same four blocks, article first, promo after it.
  { moveTo: '[data-part=seg-choreographed]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=promo][data-order=choreographed]', state: 'visible' } },
  { assert: { selector: '[data-part=related]', state: 'visible' } },
  { wait: 700 },
]);
