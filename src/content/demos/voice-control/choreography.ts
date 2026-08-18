import { steps } from '#src/stage/choreography.ts';

/**
 * Three phrases spoken at a screen that carries three controls: the first lands, the second
 * misses because the button's name does not contain the words on it, and the third misses
 * because there are no words to say. Numbers mode then addresses the same two by overlay.
 * Each segment reaches its own mode and the script clamps at its last phrase (SPEC §8), and
 * the pass ends where it started, on the label the screen can actually answer.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=said][data-utter=send]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-send][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-ok=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=num-send]', state: 'hidden' } },
  { wait: 800 },

  { moveTo: '[data-part=speak]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=said][data-utter=draft]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-ok=no]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-draft][data-selected]', state: 'hidden' } },
  { assert: { selector: '[data-part=ctl-send][data-selected]', state: 'hidden' } },
  { wait: 900 },

  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=said][data-utter=star]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-ok=no]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-star][data-selected]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-numbers]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=num-send]', state: 'visible' } },
  { assert: { selector: '[data-part=num-star]', state: 'visible' } },
  { assert: { selector: '[data-part=said][data-utter=three]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-star][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-ok=yes]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=speak]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=said][data-utter=two]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-draft][data-selected]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-star][data-selected]', state: 'hidden' } },
  { wait: 1000 },

  { moveTo: '[data-part=seg-labels]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=num-draft]', state: 'hidden' } },
  { assert: { selector: '[data-part=said][data-utter=send]', state: 'visible' } },
  { assert: { selector: '[data-part=ctl-send][data-selected]', state: 'visible' } },
  { wait: 900 },
]);
