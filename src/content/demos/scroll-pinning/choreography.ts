import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Above the section: the figure is still travelling with the page like everything else.
  { assert: { selector: '[data-part=figure][data-pin=before]', state: 'visible' } },
  { wait: 400 },
  { moveTo: '[data-part=page]' },
  // Past the chapter above and a little way into the section: the pin engages at a
  // position, not on a cue.
  { scroll: { y: 150 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-pin=pinned]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-step="1"]', state: 'visible' } },
  { wait: 500 },
  // Scroll spent inside the pin: the page moves, the figure does not, and the course
  // being laid is what advances.
  { scroll: { y: 100 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-pin=pinned]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-step="2"]', state: 'visible' } },
  { wait: 400 },
  { scroll: { y: 70 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-pin=pinned]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-step="3"]', state: 'visible' } },
  { wait: 600 },
  // Past the end of the section: the pin is bounded, so the figure comes unstuck and
  // scrolls away over the text under it.
  { scroll: { y: 60 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-pin=after]', state: 'visible' } },
  { wait: 600 },
  // Back up the way it came: pinning is a position, so the figure re-pins and the wall
  // unbuilds through exactly the frames it built through.
  { scroll: { y: -200 } },
  { wait: 500 },
  { assert: { selector: '[data-part=figure][data-pin=pinned]', state: 'visible' } },
  { assert: { selector: '[data-part=figure][data-step="1"]', state: 'visible' } },
  { wait: 600 },
]);
