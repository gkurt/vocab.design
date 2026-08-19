import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first count waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=cluster][data-width=narrow][data-lines="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-5]', state: 'visible' } },
  { wait: 600 },

  // The same tags, a wider container: they rewrap, and no breakpoint was involved.
  { moveTo: '[data-part=seg-medium]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cluster][data-width=medium][data-lines="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-0]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-wide]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cluster][data-width=wide][data-lines="2"]', state: 'visible' } },
  { wait: 700 },

  // Back to the narrowest, where the widest tag takes a line of its own.
  { moveTo: '[data-part=seg-narrow]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=cluster][data-width=narrow][data-lines="4"]', state: 'visible' } },
  { assert: { selector: '[data-part=tag-4]', state: 'visible' } },
  { wait: 700 },
]);
