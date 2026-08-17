import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=chord][data-state=none]', state: 'visible' } },
  { assert: { selector: '[data-part=editor][data-lines="4"]', state: 'visible' } },
  { moveTo: '[data-part=editor]' },
  { wait: 500 },
  // Two keys arriving on one event: the command fires once, and the file gains a line.
  { press: 'Ctrl+D' },
  { wait: 500 },
  { assert: { selector: '[data-part=chord][data-state=duplicated]', state: 'visible' } },
  { assert: { selector: '[data-part=editor][data-lines="5"]', state: 'visible' } },
  { wait: 1000 },
  // Three keys, same shape, a different command.
  { press: 'Ctrl+Shift+K' },
  { wait: 500 },
  { assert: { selector: '[data-part=chord][data-state=deleted]', state: 'visible' } },
  { assert: { selector: '[data-part=editor][data-lines="4"]', state: 'visible' } },
  { wait: 1000 },
  // The modifier on its own commands nothing, because a chord is not a modifier.
  { press: 'Control' },
  { wait: 500 },
  { assert: { selector: '[data-part=chord][data-state=modifier]', state: 'visible' } },
  { assert: { selector: '[data-part=editor][data-lines="4"]', state: 'visible' } },
  { wait: 800 },
  // The letter arriving afterwards with no modifier on it: that is a sequence, not a chord.
  { press: 'K' },
  { wait: 500 },
  { assert: { selector: '[data-part=chord][data-state=sequence]', state: 'visible' } },
  { assert: { selector: '[data-part=editor][data-lines="4"]', state: 'visible' } },
  { wait: 1000 },
]);
