import { steps } from '#src/stage/choreography.ts';

/** The word typed into the reply, chosen because it carries both bindings. */
const WORD = ['s', 'o', 'r', 'r', 'y'];

const typeWord = () => WORD.flatMap((key) => [{ press: key }, { wait: 170 }]);

/**
 * The bug first: with the bindings always on, typing "sorry" into the reply stars the message
 * and marks it replied on the way past. Then each escape WCAG 2.1.4 accepts, scoping the
 * bindings to focus and remapping them onto Ctrl, with the same five keys proving the letters
 * stay letters. Every segment reaches its own policy rather than toggling one (SPEC §8).
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=legend][data-mode=bare]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-policy=always]', state: 'visible' } },
  { moveTo: '[data-part=compose]' },
  { click: true },
  { wait: 400 },
  { assert: { selector: '[data-part=compose][data-active=yes]', state: 'visible' } },
  ...typeWord(),
  { wait: 500 },
  { assert: { selector: '[data-part=compose][data-text=yes]', state: 'visible' } },
  // Star and reply are cumulative, so they carry the whole word's damage. The log is a
  // LAST KEY readout and "sorry" ends in an unbound letter, so it reads "no" here under
  // every policy: the log's firing claim is made below, on a lone bound press.
  { assert: { selector: '[data-part=star-state][data-on=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=reply-state][data-on=yes]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-typing]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=verdict][data-policy=typing]', state: 'visible' } },
  { assert: { selector: '[data-part=star-state][data-on=no]', state: 'visible' } },
  { moveTo: '[data-part=compose]' },
  { click: true },
  { wait: 400 },
  ...typeWord(),
  { wait: 500 },
  { assert: { selector: '[data-part=compose][data-text=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=star-state][data-on=no]', state: 'visible' } },
  { assert: { selector: '[data-part=reply-state][data-on=no]', state: 'visible' } },
  { wait: 800 },
  // Out of the field and onto the message, where the same bare S is still a shortcut.
  { moveTo: '[data-part=subject-line]' },
  { click: true },
  { wait: 400 },
  { press: 's' },
  { wait: 500 },
  { assert: { selector: '[data-part=star-state][data-on=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-fired=yes]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-modifier]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=legend][data-mode=modifier]', state: 'visible' } },
  { assert: { selector: '[data-part=verdict][data-policy=modifier]', state: 'visible' } },
  { moveTo: '[data-part=compose]' },
  { click: true },
  { wait: 400 },
  { press: 's' },
  { wait: 500 },
  { assert: { selector: '[data-part=compose][data-text=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=star-state][data-on=no]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-fired=no]', state: 'visible' } },
  { wait: 700 },
  { withKey: { key: 'Control', steps: [{ press: 's' }] } },
  { wait: 500 },
  { assert: { selector: '[data-part=star-state][data-on=yes]', state: 'visible' } },
  { assert: { selector: '[data-part=log][data-fired=yes]', state: 'visible' } },
  { wait: 1200 },

  { moveTo: '[data-part=seg-always]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=legend][data-mode=bare]', state: 'visible' } },
  { wait: 800 },
]);
