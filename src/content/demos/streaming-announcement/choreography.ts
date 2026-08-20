import { steps } from '#src/stage/choreography.ts';

/**
 * The reply streams from mount, and the player remounts before every pass, so the first claims land
 * mid-stream without needing a control to start one. Claims about the flood are aimed at the count,
 * which is cumulative, rather than at the last line, which names one fragment (SPEC §8). Each
 * segment reaches an absolute state and restreams in it.
 */
export default steps([
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-quiet]', state: 'visible' } },
  { assert: { selector: '[data-part=region][aria-busy="true"]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-said=none]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },

  { wait: 2700 },
  { assert: { selector: '[data-part=w-17]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-quiet]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-said=one]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'visible' } },
  { assert: { selector: '[data-part=line-2]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-naive]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-mode=naive]', state: 'visible' } },
  { assert: { selector: '[data-part=region][data-quiet]', state: 'hidden' } },
  { assert: { selector: '[data-part=count][data-said=many]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'visible' } },

  { wait: 3600 },
  { assert: { selector: '[data-part=count][data-said=many]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1][data-cut]', state: 'visible' } },
  { assert: { selector: '[data-part=line-2]', state: 'visible' } },
  { assert: { selector: '[data-part=w-17]', state: 'visible' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-staged]' },
  { click: true },
  { wait: 900 },
  { assert: { selector: '[data-part=region][data-quiet]', state: 'visible' } },
  { assert: { selector: '[data-part=count][data-said=none]', state: 'visible' } },
  { assert: { selector: '[data-part=line-1]', state: 'hidden' } },

  { wait: 2700 },
  { assert: { selector: '[data-part=count][data-said=one]', state: 'visible' } },
  { assert: { selector: '[data-part=caption][data-mode=staged]', state: 'visible' } },
  { wait: 700 },
]);
