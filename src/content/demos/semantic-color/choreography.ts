import { steps } from '#src/stage/choreography.ts';

export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=row-danger][data-token="danger"]', state: 'visible' } },
  { assert: { selector: '[data-part=row-danger][data-resolves="red-600"]', state: 'visible' } },
  { wait: 900 },
  // Each segment names a whole scheme, so the table lands on the same values on any pass.
  { moveTo: '[data-part=seg-dusk]' },
  { click: true },
  { wait: 500 },
  // The value moved.
  { assert: { selector: '[data-part=row-danger][data-resolves="red-300"]', state: 'visible' } },
  // The name did not, which is the term.
  { assert: { selector: '[data-part=row-danger][data-token="danger"]', state: 'visible' } },
  // And the name that leaked its hue is pointing where it always did.
  { assert: { selector: '[data-part=row-leaked][data-resolves="blue-600"]', state: 'visible' } },
  { wait: 1500 },
  { moveTo: '[data-part=seg-day]' },
  { click: true },
  { wait: 500 },
  { assert: { selector: '[data-part=row-danger][data-resolves="red-600"]', state: 'visible' } },
  { assert: { selector: '[data-part=seg-day][data-selected]', state: 'visible' } },
  { wait: 1200 },
]);
