import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the resting claims wait for the window to land.
  { wait: 700 },
  { assert: { selector: '[data-part=code]', state: 'visible' } },
  { assert: { selector: '[data-part=status][data-state=live]', state: 'visible' } },
  { assert: { selector: '[data-part=life][data-zone=ok]', state: 'visible' } },
  // The typed fallback is there from the start: a code is never the only route.
  { assert: { selector: '[data-part=fallback]', state: 'visible' } },
  { assert: { selector: '[data-part=refresh]', state: 'hidden' } },
  { wait: 600 },

  // Naming the expired state greys the matrix and says so, rather than letting a scan fail silently.
  { moveTo: '[data-part=seg-expired]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=status][data-state=expired]', state: 'visible' } },
  { assert: { selector: '[data-part=life][data-zone=warn]', state: 'visible' } },
  { assert: { selector: '[data-part=refresh]', state: 'visible' } },
  { assert: { selector: '[data-part=fallback]', state: 'visible' } },
  { wait: 900 },

  // Refreshing issues a live code again, driven through the kit element's own value setter.
  { moveTo: '[data-part=refresh]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=status][data-state=live]', state: 'visible' } },
  { assert: { selector: '[data-part=life][data-zone=ok]', state: 'visible' } },
  { assert: { selector: '[data-part=refresh]', state: 'hidden' } },
  { assert: { selector: '[data-part=code]', state: 'visible' } },
  { wait: 900 },
]);
