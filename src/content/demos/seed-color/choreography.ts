import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The chain is on stage from mount, so the pose already shows the term.
  { assert: { selector: '[data-part=chain][data-seed="indigo"]', state: 'visible' } },
  { assert: { selector: '[data-part=role-primary]', state: 'visible' } },
  { wait: 900 },
  // Each segment names one seed outright, so a pass picked up anywhere lands the same.
  { moveTo: '[data-part=seg-coral]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chain][data-seed="coral"]', state: 'visible' } },
  { assert: { selector: '[data-part=role-container]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-moss]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chain][data-seed="moss"]', state: 'visible' } },
  { assert: { selector: '[data-part=tone-40]', state: 'visible' } },
  { wait: 1200 },
  { moveTo: '[data-part=seg-indigo]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=chain][data-seed="indigo"]', state: 'visible' } },
  { wait: 900 },
]);
