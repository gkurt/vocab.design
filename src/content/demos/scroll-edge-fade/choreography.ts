import { steps } from '#src/stage/choreography.ts';

// The fades are read off the scroller's position, so the script proves each strip appears
// only while something is clipped past that edge: nothing above at rest, nothing below once
// the list runs out.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=fade-bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=fade-top]', state: 'hidden' } },
  { moveTo: '[data-part=page]' },
  { wait: 400 },
  // Mid list: clipped both ways, so both edges fade.
  { scroll: { y: 110 } },
  { wait: 600 },
  { assert: { selector: '[data-part=fade-top]', state: 'visible' } },
  { assert: { selector: '[data-part=fade-bottom]', state: 'visible' } },
  { wait: 700 },
  // All the way down: the bottom fade would be claiming a row that does not exist.
  { scroll: { y: 400 } },
  { wait: 700 },
  { assert: { selector: '[data-part=fade-top]', state: 'visible' } },
  { assert: { selector: '[data-part=fade-bottom]', state: 'hidden' } },
  { wait: 900 },
  // Back to the start, where the top fade has nothing to hint at either.
  { scroll: { y: -520 } },
  { wait: 700 },
  { assert: { selector: '[data-part=fade-bottom]', state: 'visible' } },
  { assert: { selector: '[data-part=fade-top]', state: 'hidden' } },
  { wait: 800 },
]);
