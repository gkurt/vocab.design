import { steps } from '#src/stage/choreography.ts';

// The same two navigations are made twice, once on each setting, and the evidence is the side the
// arriving pane came in from, which the pane keeps after it settles. The move is 520 ms after a 60 ms
// beat, so every claim is made a full second later rather than mid-flight.
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=pane][data-mode=directional][data-level=list][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=row-2]', state: 'visible' } },

  // Deeper: in from the right.
  { moveTo: '[data-part=row-2]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=pane][data-level=detail][data-from=right][data-state=settled]', state: 'visible' } },
  { assert: { selector: '[data-part=back]', state: 'visible' } },

  // Back out: in from the left, which is the whole claim.
  { moveTo: '[data-part=back]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=pane][data-level=list][data-from=left][data-state=settled]', state: 'visible' } },

  { moveTo: '[data-part=seg-undirected]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pane][data-mode=undirected][data-level=list]', state: 'visible' } },

  { moveTo: '[data-part=row-2]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=pane][data-level=detail][data-from=right][data-state=settled]', state: 'visible' } },

  // The loss of place: going back arrives from the right as well.
  { moveTo: '[data-part=back]' },
  { wait: 400 },
  { click: true },
  { wait: 1000 },
  { assert: { selector: '[data-part=pane][data-level=list][data-from=right][data-state=settled]', state: 'visible' } },

  { moveTo: '[data-part=seg-directional]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=pane][data-mode=directional][data-level=list]', state: 'visible' } },
  { wait: 700 },
]);
