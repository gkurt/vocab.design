import { steps } from '#src/stage/choreography.ts';

export default steps([
  // Kit surfaces fade in from mount, so the first claim waits for them to land.
  { wait: 420 },
  { assert: { selector: '[data-part=rung-rest][data-current]', state: 'visible' } },
  { assert: { selector: '[data-part=live-filters][data-state=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-pressed]', state: 'visible' } },
  { wait: 900 },
  // The pointer arrives and the control takes the next rung, not a filter.
  { moveTo: '[data-part=live-filters]' },
  { wait: 500 },
  { assert: { selector: '[data-part=live-filters][data-state=hovered]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-hovered][data-current]', state: 'visible' } },
  { wait: 1100 },
  // Selecting walks one rung further, and selection outranks the pointer still resting on it.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=live-filters][data-state=selected]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-selected][data-current]', state: 'visible' } },
  { wait: 1300 },
  // Hovering the other control shows both rungs in use at once: one hovered, one selected.
  { moveTo: '[data-part=live-sort]' },
  { wait: 500 },
  { assert: { selector: '[data-part=live-sort][data-state=hovered]', state: 'visible' } },
  { assert: { selector: '[data-part=live-filters][data-state=selected]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-hovered][data-current]', state: 'visible' } },
  { wait: 1200 },
  // Absolute, not a toggle: this click selects Sort and drops Filters back to rest.
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=live-sort][data-state=selected]', state: 'visible' } },
  { assert: { selector: '[data-part=live-filters][data-state=rest]', state: 'visible' } },
  { assert: { selector: '[data-part=rung-selected][data-current]', state: 'visible' } },
  { wait: 900 },
]);
