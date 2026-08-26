import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): taking light away has one state, and it is the picture. Nothing here
// answers a pointer, so the asserts carry the proof: the three inks, the overlap they stop at, and
// the legend that prints each product. The opening wait is the kit's mount fade.
export default steps([
  { wait: 480 },
  { assert: { selector: '[data-part=overlap]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-cyan]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=ink-magenta]', state: 'visible' } },
  { assert: { selector: '[data-part=ink-yellow]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=legend-sludge]', state: 'visible' } },
  { assert: { selector: '[data-part=legend-green]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=caption]', state: 'visible' } },
  { assert: { selector: '[data-part=overlap]', state: 'visible' } },
  { wait: 1000 },
]);
