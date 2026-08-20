import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for the scene to land.
  { wait: 500 },
  { assert: { selector: '[data-part=grade][data-stop=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=weight][data-stop=zero]', state: 'visible' } },
  // The end markers: 2px rules, claimed themselves rather than through their row.
  { assert: { selector: '[data-part=mark-grade]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-weight]', state: 'visible' } },
  { assert: { selector: '[data-part=tail-grade]', state: 'visible' } },
  // Absolute picks, never a flip: each segment names a grade on the axis.
  { moveTo: '[data-part=seg-plus150]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grade][data-stop=plus150]', state: 'visible' } },
  { assert: { selector: '[data-part=weight][data-stop=plus150]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-grade]', state: 'visible' } },
  { assert: { selector: '[data-part=tail-weight]', state: 'visible' } },
  { moveTo: '[data-part=read-grade]' },
  { wait: 700 },
  { assert: { selector: '[data-part=read-grade]', state: 'visible' } },
  { moveTo: '[data-part=seg-minus50]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grade][data-stop=minus50]', state: 'visible' } },
  { assert: { selector: '[data-part=mark-grade]', state: 'visible' } },
  // Ends at the grade the specimen mounts with.
  { moveTo: '[data-part=seg-zero]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=grade][data-stop=zero]', state: 'visible' } },
  { assert: { selector: '[data-part=read-weight]', state: 'visible' } },
  { wait: 700 },
]);
