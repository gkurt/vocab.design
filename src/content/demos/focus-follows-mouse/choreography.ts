import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to arrive.
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-mode=click]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-notes][data-sim-focus]', state: 'visible' } },
  // Click to focus: the pointer can rest on the other window all day and nothing moves.
  { moveTo: '[data-part=field-terminal]' },
  { wait: 700 },
  { assert: { selector: '[data-part=pane-terminal][data-sim-focus]', state: 'hidden' } },
  { assert: { selector: '[data-part=pane-notes][data-sim-focus]', state: 'visible' } },
  { wait: 600 },
  // The click is the thing that claims the keyboard.
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=pane-terminal][data-sim-focus]', state: 'visible' } },
  { type: 'top' },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-last=terminal]', state: 'visible' } },
  { wait: 900 },
  // The other model, picked outright rather than toggled.
  { moveTo: '[data-part=mode-follow]' },
  { wait: 400 },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-mode=follow]', state: 'visible' } },
  { wait: 500 },
  // Now arriving is enough, and no click happens at all.
  { moveTo: '[data-part=field-notes]' },
  { wait: 700 },
  { assert: { selector: '[data-part=pane-notes][data-sim-focus]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-terminal][data-sim-focus]', state: 'hidden' } },
  { type: 'harbour lights' },
  { wait: 500 },
  { assert: { selector: '[data-part=desk][data-last=notes]', state: 'visible' } },
  { wait: 900 },
  // And back the other way, still without a click.
  { moveTo: '[data-part=field-terminal]' },
  { wait: 700 },
  { assert: { selector: '[data-part=pane-terminal][data-sim-focus]', state: 'visible' } },
  { wait: 1000 },
]);
