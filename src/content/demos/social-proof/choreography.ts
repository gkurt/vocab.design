import { steps } from '#src/stage/choreography.ts';

// The four kinds are proved present and checkable first, then the same four are shown
// with their evidence deleted, and the pass ends back on the state the demo mounts in.
export default steps([
  { assert: { selector: '[data-part=cluster][data-mode="specific"]', state: 'visible' } },
  { assert: { selector: '[data-part=reviews][data-count="1284"]', state: 'visible' } },
  { assert: { selector: '[data-part=usage][data-value="12400"]', state: 'visible' } },
  { assert: { selector: '[data-part=faces]', state: 'visible' } },
  { assert: { selector: '[data-part=quote][data-attributed="named"]', state: 'visible' } },
  { assert: { selector: '[data-part=rating]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=mode-vague]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=cluster][data-mode="vague"]', state: 'visible' } },
  { assert: { selector: '[data-part=reviews][data-count="0"]', state: 'visible' } },
  { assert: { selector: '[data-part=quote][data-attributed="anon"]', state: 'visible' } },
  { wait: 1400 },
  { moveTo: '[data-part=mode-specific]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=cluster][data-mode="specific"]', state: 'visible' } },
  { assert: { selector: '[data-part=quote][data-attributed="named"]', state: 'visible' } },
  { wait: 1000 },
]);
