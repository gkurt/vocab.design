import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=page][data-at=tides][data-state=idle]', state: 'visible' } },
  { moveTo: '[data-part=link-anchorages]' },
  { click: true },
  // Judged inside the trip: the panel is travelling rather than already there.
  { assert: { selector: '[data-part=page][data-state=gliding]', state: 'visible' } },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-at=anchorages][data-state=idle]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=link-lights]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=page][data-at=lights][data-state=idle]', state: 'visible' } },
  { wait: 500 },
  // The same navigation as a cut: same destination, no trip to watch.
  { moveTo: '[data-part=mode-instant]' },
  { click: true },
  { wait: 400 },
  { moveTo: '[data-part=link-tides]' },
  { click: true },
  { wait: 300 },
  { assert: { selector: '[data-part=page][data-at=tides][data-state=idle]', state: 'visible' } },
  { wait: 600 },
]);
