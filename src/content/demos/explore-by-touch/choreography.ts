import { steps } from '#src/stage/choreography.ts';

/**
 * Sweep the finger down the screen and the speech line follows it, one row at a time. A
 * single tap only reads what it lands on; the double tap that follows is what finally opens
 * it. Each gesture reaches its own state rather than flipping one (SPEC §8), and the claims
 * are made on the two readouts, which stay on screen throughout.
 */
export default steps([
  { wait: 400 },
  { assert: { selector: '[data-part=speech][data-state=idle]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=none]', state: 'visible' } },
  { assert: { selector: '[data-part=mode]', state: 'visible' } },
  { wait: 700 },

  { moveTo: '[data-part=row-priya]' },
  { drag: { to: '[data-part=row-standup]' } },
  { wait: 700 },
  { assert: { selector: '[data-part=speech][data-said=standup]', state: 'visible' } },
  { assert: { selector: '[data-part=screen][data-reading=standup]', state: 'visible' } },
  // Sweeping over three rows announced them and opened none.
  { assert: { selector: '[data-part=result][data-state=none]', state: 'visible' } },
  { wait: 1000 },

  { moveTo: '[data-part=row-compose]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=speech][data-said=compose]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-state=read]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-opened=none]', state: 'visible' } },
  { wait: 1200 },

  { dblclick: true },
  { wait: 700 },
  { assert: { selector: '[data-part=result][data-state=opened]', state: 'visible' } },
  { assert: { selector: '[data-part=result][data-opened=compose]', state: 'visible' } },
  { wait: 1000 },
]);
