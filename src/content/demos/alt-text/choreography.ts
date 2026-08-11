import { steps } from '#src/stage/choreography.ts';

/** Each segment names the source it asks for, so a resumed run lands somewhere true. */
export default steps([
  { assert: { selector: '[data-part=photo][data-state=loaded]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-failed]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=photo][data-state=failed]', state: 'visible' } },
  { wait: 1800 },
  { moveTo: '[data-part=seg-loaded]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=photo][data-state=loaded]', state: 'visible' } },
  { wait: 1200 },
]);
