import { steps } from '#src/stage/choreography.ts';

/**
 * The exhibit stands still and the legend walks the ramp's users: the wheelchair it was cut
 * for, then the three people the brief never mentioned. Each legend button reaches its own
 * traveller, so a pass joined halfway proves the same thing (SPEC §8).
 */
export default steps([
  { assert: { selector: '[data-part=kerb][data-who=wheelchair]', state: 'visible' } },
  { assert: { selector: '[data-part=figure-pram]', state: 'visible' } },
  { assert: { selector: '[data-part=figure-trolley]', state: 'visible' } },
  { assert: { selector: '[data-part=figure-suitcase]', state: 'visible' } },
  { assert: { selector: '[data-part=software]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=pick-pram]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=kerb][data-who=pram]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-who=pram]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=pick-trolley]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=kerb][data-who=trolley]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-who=trolley]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=pick-suitcase]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=kerb][data-who=suitcase]', state: 'visible' } },
  { wait: 1100 },
  { moveTo: '[data-part=pick-wheelchair]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=kerb][data-who=wheelchair]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-who=wheelchair]', state: 'visible' } },
  { wait: 900 },
]);
