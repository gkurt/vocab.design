import { steps } from '#src/stage/choreography.ts';

// A remote and nothing else: four arrows move the highlight, and the rail slides only when
// the highlight would otherwise leave the title-safe area.
export default steps([
  { wait: 500 },
  { assert: { selector: '[data-part=card-0-0][data-focused]', state: 'visible' } },
  { moveTo: '[data-part=screen]' },
  { wait: 400 },
  { press: 'ArrowRight' },
  { wait: 500 },
  { assert: { selector: '[data-part=card-0-1][data-focused]', state: 'visible' } },
  { press: 'ArrowRight' },
  { wait: 500 },
  { press: 'ArrowRight' },
  { wait: 600 },
  { assert: { selector: '[data-part=card-0-3][data-focused]', state: 'visible' } },
  { assert: { selector: '[data-part=card-0-0][data-focused]', state: 'hidden' } },
  { wait: 700 },
  { press: 'ArrowDown' },
  { wait: 600 },
  { assert: { selector: '[data-part=card-1-3][data-focused]', state: 'visible' } },
  { wait: 700 },
  { press: 'ArrowLeft' },
  { wait: 500 },
  { press: 'ArrowLeft' },
  { wait: 600 },
  { assert: { selector: '[data-part=card-1-1][data-focused]', state: 'visible' } },
  { wait: 900 },
]);
