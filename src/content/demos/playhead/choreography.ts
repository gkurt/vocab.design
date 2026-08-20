import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, and the marker rests at the head of the timeline.
  { wait: 700 },
  { assert: { selector: '[data-part=playhead][data-at=start]', state: 'visible' } },
  { assert: { selector: '[data-part=play]', state: 'visible' } },
  { assert: { selector: '[data-part=play][data-playing]', state: 'hidden' } },
  { wait: 300 },

  // Playback: the marker travels, and the timecode is what it is reporting.
  { moveTo: '[data-part=play]' },
  { click: true },
  { wait: 1400 },
  { assert: { selector: '[data-part=playhead][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=play][data-playing]', state: 'visible' } },

  // It runs out of timeline and stops there, still on stage.
  { wait: 3200 },
  { assert: { selector: '[data-part=playhead][data-at=end]', state: 'visible' } },
  { assert: { selector: '[data-part=play][data-playing]', state: 'hidden' } },
  { wait: 500 },

  // The other half of the job: dragging its head moves playback back down the timeline.
  { moveTo: '[data-part=playhead]' },
  { drag: { to: '[data-part=aim-early]' } },
  { wait: 600 },
  { assert: { selector: '[data-part=playhead][data-at=mid]', state: 'visible' } },
  { assert: { selector: '[data-part=play][data-playing]', state: 'hidden' } },
  { wait: 800 },
]);
