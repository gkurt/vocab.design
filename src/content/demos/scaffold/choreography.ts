import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The frame fades in from mount, so the first reading of the slots waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=slots]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-body][data-screen=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=slots][data-slots="38-60-414-186"]', state: 'visible' } },
  { wait: 600 },

  // A different screen, dropped into the same body slot. The frame is measured after the
  // swap, so the assert is a real claim that nothing around the content moved.
  { moveTo: '[data-part=seg-calendar]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot-body][data-screen=calendar]', state: 'visible' } },
  { assert: { selector: '[data-part=slots][data-slots="38-60-414-186"]', state: 'visible' } },
  { assert: { selector: '[data-part=fab]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-files]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot-body][data-screen=files]', state: 'visible' } },
  { assert: { selector: '[data-part=slots][data-slots="38-60-414-186"]', state: 'visible' } },
  { assert: { selector: '[data-part=slot-rail]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=seg-inbox]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=slot-body][data-screen=inbox]', state: 'visible' } },
  { assert: { selector: '[data-part=slots][data-slots="38-60-414-186"]', state: 'visible' } },
  { wait: 700 },
]);
