import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Short page: the footer is on the bottom edge with nothing floating above it.
  { assert: { selector: '[data-part=footer][data-mode=held]', state: 'visible' } },
  { assert: { selector: '[data-part=line-12]', state: 'hidden' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-long]' },
  { click: true },
  { wait: 700 },
  // Long page: the footer yields and goes back to being the end of the document.
  { assert: { selector: '[data-part=line-12]', state: 'visible' } },
  { assert: { selector: '[data-part=footer][data-mode=pushed]', state: 'visible' } },
  { moveTo: '[data-part=viewport]' },
  { scroll: { y: 220 } },
  { wait: 700 },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { wait: 1000 },
  { moveTo: '[data-part=seg-short]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=footer][data-mode=held]', state: 'visible' } },
  { assert: { selector: '[data-part=line-12]', state: 'hidden' } },
  { wait: 800 },
]);
