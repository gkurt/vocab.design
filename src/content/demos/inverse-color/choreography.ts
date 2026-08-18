import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=scene][data-theme=light]', state: 'visible' } },
  // Light app, dark snackbar: the pair is opposite the theme it sits in.
  { assert: { selector: '[data-part=snackbar][data-tone=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=snack-action]', state: 'visible' } },
  { assert: { selector: '[data-part=readout-inverse]', state: 'visible' } },
  { wait: 1300 },
  // Each segment names one theme outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-dark]' },
  { click: true },
  { wait: 650 },
  // The app went dark and the snackbar went light with it, staying opposite.
  { assert: { selector: '[data-part=scene][data-theme=dark]', state: 'visible' } },
  { assert: { selector: '[data-part=snackbar][data-tone=light]', state: 'visible' } },
  { assert: { selector: '[data-part=snack-message]', state: 'visible' } },
  { wait: 1700 },
  { moveTo: '[data-part=seg-light]' },
  { click: true },
  { wait: 650 },
  { assert: { selector: '[data-part=scene][data-theme=light]', state: 'visible' } },
  { assert: { selector: '[data-part=snackbar][data-tone=dark]', state: 'visible' } },
  { wait: 900 },
]);
