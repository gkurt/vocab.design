import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  // Four regions at once: three versions to read, one to write.
  { assert: { selector: '[data-part=pane-mine]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-base]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-theirs]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-choice=unresolved]', state: 'visible' } },
  { wait: 500 },
  { moveTo: '[data-part=accept-theirs]' },
  { click: true },
  { wait: 700 },
  // One side taken, and the ancestor is still on screen: it is read, never edited.
  { assert: { selector: '[data-part=result][data-choice=theirs]', state: 'visible' } },
  { assert: { selector: '[data-part=pane-base]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=accept-both]' },
  { click: true },
  { wait: 700 },
  // Keeping both is a real button and usually the wrong answer: the name is now set twice.
  { assert: { selector: '[data-part=result][data-choice=both]', state: 'visible' } },
  { assert: { selector: '[data-part=result-state][data-warn]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=accept-mine]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-choice=mine]', state: 'visible' } },
  { assert: { selector: '[data-part=result-state][data-warn]', state: 'hidden' } },
  { wait: 1000 },
]);
