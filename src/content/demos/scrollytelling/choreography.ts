import { steps } from '#src/stage/choreography.ts';

// The graphic holds still while the story moves past it, and the paragraph the reader has
// arrived at chooses what it shows. Scrolling back up runs the same boundaries in reverse.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=graphic][data-step="1"]', state: 'visible' } },
  { moveTo: '[data-part=page]' },
  { wait: 400 },
  { scroll: { y: 130 } },
  { wait: 600 },
  { assert: { selector: '[data-part=graphic][data-step="2"]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 130 } },
  { wait: 600 },
  { assert: { selector: '[data-part=graphic][data-step="3"]', state: 'visible' } },
  { wait: 700 },
  { scroll: { y: 130 } },
  { wait: 600 },
  { assert: { selector: '[data-part=graphic][data-step="4"]', state: 'visible' } },
  { wait: 900 },
  // Backwards through the same boundaries: a story that cannot be read back up has a bug.
  { scroll: { y: -400 } },
  { wait: 700 },
  { assert: { selector: '[data-part=graphic][data-step="1"]', state: 'visible' } },
  { wait: 800 },
]);
