import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The panel fades in from mount, so the first reading of the alignment waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=keyline]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-align=on]', state: 'visible' } },
  { assert: { selector: '[data-part=text-2][data-fit=on]', state: 'visible' } },
  { assert: { selector: '[data-part=text-4][data-fit=on]', state: 'visible' } },
  { wait: 700 },

  // Each text following its own leading element instead: three rows come off the line.
  { moveTo: '[data-part=seg-off]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=list][data-align=off]', state: 'visible' } },
  { assert: { selector: '[data-part=text-2][data-fit=off]', state: 'visible' } },
  { assert: { selector: '[data-part=text-3][data-fit=off]', state: 'visible' } },
  { assert: { selector: '[data-part=keyline]', state: 'visible' } },
  { wait: 900 },

  // Back on the line, including the row whose leading element is the narrowest.
  { moveTo: '[data-part=seg-on]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=text-3][data-fit=on]', state: 'visible' } },
  { assert: { selector: '[data-part=list][data-align=on]', state: 'visible' } },
  { wait: 700 },
]);
