import { steps } from '#src/stage/choreography.ts';

/**
 * One chart, three alternatives. The pass opens the values table from the real description and
 * shuts it again explicitly, then walks back through the two failures: alt text that names the
 * chart type and says nothing about the data, and no alternative at all. Every segment reaches
 * its own state absolutely, and the last one returns to the description the specimen mounted
 * with, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=given][data-value=full]', state: 'visible' } },
  { assert: { selector: '[data-part=description][data-mode=full]', state: 'visible' } },
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { assert: { selector: '[data-part=values-table]', state: 'hidden' } },
  { wait: 600 },

  { moveTo: '[data-part=show-values]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=values-table]', state: 'visible' } },
  { assert: { selector: '[data-part=show-values]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=hide-values]' },
  { click: true },
  { wait: 550 },
  { assert: { selector: '[data-part=values-table]', state: 'hidden' } },
  { assert: { selector: '[data-part=show-values]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-alt]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=given][data-value=alt]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-alt]', state: 'visible' } },
  { assert: { selector: '[data-part=summary]', state: 'hidden' } },
  { assert: { selector: '[data-part=announce][data-mode=alt]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-none]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=given][data-value=none]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-none]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-alt]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-full]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=given][data-value=full]', state: 'visible' } },
  { assert: { selector: '[data-part=summary]', state: 'visible' } },
  { assert: { selector: '[data-part=values-table]', state: 'hidden' } },
  { wait: 900 },
]);
