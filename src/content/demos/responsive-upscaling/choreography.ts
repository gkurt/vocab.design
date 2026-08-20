import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the page waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=page][data-screen=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-cap=held]', state: 'visible' } },
  { assert: { selector: '[data-part=sidebar]', state: 'visible' } },
  { wait: 600 },

  // The failure: the same width handed straight to the column, which runs past its cap.
  { moveTo: '[data-part=seg-stretched]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-cap=over]', state: 'visible' } },
  { assert: { selector: '[data-part=sidebar]', state: 'hidden' } },
  { wait: 800 },

  // Below the last breakpoint there is no surplus to spend, and the column simply fits.
  { moveTo: '[data-part=seg-narrower]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=page][data-screen=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=column][data-cap=under]', state: 'visible' } },
  { wait: 800 },

  // Back to the designed state: measure held, surplus given a job.
  { moveTo: '[data-part=seg-designed]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=column][data-cap=held]', state: 'visible' } },
  { assert: { selector: '[data-part=sidebar]', state: 'visible' } },
  { wait: 700 },
]);
