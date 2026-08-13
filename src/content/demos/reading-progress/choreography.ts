import { steps } from '#src/stage/choreography.ts';

// Down, past the end of the article, and back up again. The last pair is the whole
// distinction from an animation a scroll merely starts: the fill goes back down.
export default steps([
  { assert: { selector: '[data-part=bar][data-zone="start"]', state: 'visible' } },
  { moveTo: '[data-part=doc]' },
  { scroll: { y: 140 } },
  { wait: 450 },
  { assert: { selector: '[data-part=bar][data-zone="middle"]', state: 'visible' } },
  { scroll: { y: 340 } },
  { wait: 450 },
  { assert: { selector: '[data-part=bar][data-zone="end"]', state: 'visible' } },
  { wait: 400 },
  // The comments below the article scroll past a bar that is already full.
  { scroll: { y: 60 } },
  { wait: 450 },
  { assert: { selector: '[data-part=bar][data-zone="end"]', state: 'visible' } },
  { wait: 500 },
  { scroll: { y: -300 } },
  { wait: 450 },
  { assert: { selector: '[data-part=bar][data-zone="middle"]', state: 'visible' } },
  { assert: { selector: '[data-part=bar][data-zone="end"]', state: 'hidden' } },
  { wait: 1000 },
]);
