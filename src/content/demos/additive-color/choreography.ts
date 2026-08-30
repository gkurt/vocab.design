import { steps } from '#src/stage/choreography.ts';

// A still script (SPEC §8): adding light has one state, and it is the picture. There is nothing
// for a cursor to reach for, so the asserts do the work: the three emitters, the overlap they
// sum to, and the legend that names each sum. The opening wait is the kit's mount fade.
export default steps([
  { wait: 480 },
  { assert: { selector: '[data-part=overlap]', state: 'visible' } },
  { assert: { selector: '[data-part=light-red]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=light-green]', state: 'visible' } },
  { assert: { selector: '[data-part=light-blue]', state: 'visible' } },
  { wait: 1600 },
  { assert: { selector: '[data-part=legend-white]', state: 'visible' } },
  { assert: { selector: '[data-part=legend-yellow]', state: 'visible' } },
  { wait: 1500 },
  { assert: { selector: '[data-part=legend-cyan]', state: 'visible' } },
  { assert: { selector: '[data-part=overlap]', state: 'visible' } },
  { wait: 1000 },
]);
