import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The table fades in from mount, so the first reading of the boundary waits for it.
  { wait: 700 },
  { assert: { selector: '[data-part=table][data-mode=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=grip]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-width="130"]', state: 'visible' } },
  { assert: { selector: '[data-part=table][data-others="96-76"]', state: 'visible' } },
  { wait: 500 },

  // Pull the boundary right. The column widens; the other three keep the widths they had.
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=stop-172]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=readout][data-band=wide]', state: 'visible' } },
  { assert: { selector: '[data-part=table][data-others="96-76"]', state: 'visible' } },
  { wait: 700 },

  // Double clicking the same strip fits the column to its widest cell.
  { moveTo: '[data-part=grip]' },
  { dblclick: true },
  { wait: 800 },
  { assert: { selector: '[data-part=table][data-mode=fit]', state: 'visible' } },
  { assert: { selector: '[data-part=table][data-others="96-76"]', state: 'visible' } },
  { wait: 800 },

  // Fill: the policy hands the column every pixel the others left over.
  { moveTo: '[data-part=seg-fill]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=table][data-mode=fill]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-band=wide]', state: 'visible' } },
  { wait: 700 },

  // Dragging is always an explicit width, so it hands the column back to fixed, narrow
  // enough that the names it cannot fit are the ellipsis the policy costs.
  { moveTo: '[data-part=grip]' },
  { drag: { to: '[data-part=stop-84]' } },
  { wait: 800 },
  { assert: { selector: '[data-part=table][data-mode=fixed]', state: 'visible' } },
  { assert: { selector: '[data-part=readout][data-band=narrow]', state: 'visible' } },
  { assert: { selector: '[data-part=table][data-others="96-76"]', state: 'visible' } },
  { wait: 800 },
]);
