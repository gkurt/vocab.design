import { steps } from '#src/stage/choreography.ts';

export default steps([
  // The window fades in from mount, so the macOS claims wait for it to land.
  { wait: 700 },
  { assert: { selector: '[data-part=cluster][data-platform=macos]', state: 'visible' } },
  { assert: { selector: '[data-part=cluster][data-side=left]', state: 'visible' } },
  { assert: { selector: '[data-part=btn-close]', state: 'visible' } },
  { assert: { selector: '[data-part=btn-zoom]', state: 'visible' } },
  { assert: { selector: '[data-part=action][data-act=none]', state: 'visible' } },
  { wait: 600 },
  // Pressing a control names its effect: the specimen may not reach past the stage.
  { moveTo: '[data-part=btn-min]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=action][data-act=minimise]', state: 'visible' } },
  { wait: 900 },
  // The picker names an absolute platform, so a pass picked up anywhere reads the same.
  { moveTo: '[data-part=seg-windows]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=cluster][data-platform=windows]', state: 'visible' } },
  { assert: { selector: '[data-part=cluster][data-side=right]', state: 'visible' } },
  { assert: { selector: '[data-part=btn-close]', state: 'visible' } },
  { assert: { selector: '[data-part=action][data-act=none]', state: 'visible' } },
  // The title bar itself never changed: the same window, the cluster moved across it.
  { assert: { selector: '[data-part=titlebar]', state: 'visible' } },
  { wait: 600 },
  { moveTo: '[data-part=btn-close]' },
  { click: true },
  { wait: 600 },
  { assert: { selector: '[data-part=action][data-act=close]', state: 'visible' } },
  { wait: 900 },
  { moveTo: '[data-part=seg-macos]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=cluster][data-platform=macos][data-side=left]', state: 'visible' } },
  { assert: { selector: '[data-part=action][data-act=none]', state: 'visible' } },
  { wait: 800 },
]);
