import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=page]', state: 'visible' } },
  { assert: { selector: '[data-part=header]', state: 'visible' } },
  { moveTo: '[data-part=nav]' },
  { wait: 800 },
  // Fixed, fluid, fixed: all three columns are on stage at once, and so are the
  // header and footer that close the page.
  { assert: { selector: '[data-part=nav]', state: 'visible' } },
  { moveTo: '[data-part=main]' },
  { wait: 800 },
  { assert: { selector: '[data-part=main]', state: 'visible' } },
  { moveTo: '[data-part=aside]' },
  { wait: 800 },
  { assert: { selector: '[data-part=aside]', state: 'visible' } },
  { moveTo: '[data-part=footer]' },
  { wait: 800 },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 600 },
]);
