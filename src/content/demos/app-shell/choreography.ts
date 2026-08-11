import { steps } from '#src/stage/choreography.ts';

export default steps([
  { assert: { selector: '[data-part=shell][data-view=overview]', state: 'visible' } },
  { assert: { selector: '[data-part=view-overview]', state: 'visible' } },
  { moveTo: '[data-part=nav-berths]' },
  { click: true },
  { wait: 600 },
  // The content region was replaced, and the frame around it was not.
  { assert: { selector: '[data-part=view-berths]', state: 'visible' } },
  { assert: { selector: '[data-part=view-overview]', state: 'hidden' } },
  { assert: { selector: '[data-part=nav-berths][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=topbar]', state: 'visible' } },
  { assert: { selector: '[data-part=footer]', state: 'visible' } },
  { assert: { selector: '[data-part=shell][data-loads="2"]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-tides]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=view-tides]', state: 'visible' } },
  { assert: { selector: '[data-part=view-berths]', state: 'hidden' } },
  // A third view has been through the same region, counted by the shell that hosted all three.
  { assert: { selector: '[data-part=shell][data-loads="3"]', state: 'visible' } },
  { assert: { selector: '[data-part=rail]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=nav-overview]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=view-overview]', state: 'visible' } },
  { assert: { selector: '[data-part=nav-overview][data-current]', state: 'visible' } },
  { wait: 800 },
]);
