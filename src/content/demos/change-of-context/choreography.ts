import { steps } from '#src/stage/choreography.ts';

/**
 * The conforming wiring first: pick a region, prove the page has not moved, then ask for it.
 * The same pick under the on-input wiring reloads the page by itself. Every step reaches a
 * named state rather than flipping one, so a pass joined halfway still ends here (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=page][data-view=uk]', state: 'visible' } },
  { assert: { selector: '[data-part=go]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=option-de]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=option-de][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-view=uk]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=go]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=page][data-view=de]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-input]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=picker][data-mode=input]', state: 'visible' } },
  { assert: { selector: '[data-part=go]', state: 'hidden' } },
  { assert: { selector: '[data-part=page][data-view=uk]', state: 'visible' } },
  { wait: 700 },
  { moveTo: '[data-part=option-jp]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=option-jp][aria-selected="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=page][data-view=jp]', state: 'visible' } },
  { wait: 1100 },
]);
