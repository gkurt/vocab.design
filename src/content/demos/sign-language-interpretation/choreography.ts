import { steps } from '#src/stage/choreography.ts';

/**
 * One video under three provisions, each reached absolutely rather than by toggling (SPEC §8). The
 * wait after the first pick is load-bearing: it is the beat a summon polls to bring the signed track
 * on stage (SPEC §6). The pass ends where it mounted, with captions alone.
 */
export default steps([
  { wait: 700 },
  { assert: { selector: '[data-part=captions]', state: 'visible' } },
  { assert: { selector: '[data-part=track]', state: 'hidden' } },
  { wait: 900 },

  { moveTo: '[data-part=seg-inset]' },
  { click: true },
  { wait: 700 },
  { assert: { selector: '[data-part=track][data-mode=inset]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=inset]', state: 'visible' } },
  { wait: 2000 },

  { moveTo: '[data-part=seg-companion]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=track][data-mode=companion]', state: 'visible' } },
  { assert: { selector: '[data-part=captions]', state: 'visible' } },
  { assert: { selector: '[data-part=note][data-mode=companion]', state: 'visible' } },
  { wait: 2200 },

  { moveTo: '[data-part=seg-captions]' },
  { click: true },
  { wait: 800 },
  { assert: { selector: '[data-part=track]', state: 'hidden' } },
  { assert: { selector: '[data-part=note][data-mode=captions]', state: 'visible' } },
  { wait: 900 },
]);
