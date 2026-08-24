import { localBox } from '#src/kit/measure.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How much of the scroll each layer is allowed to answer. The front layer answers all of it. */
const RATES = { back: 0.22, mid: 0.55 } as const;

const CLOUDS = [
  { size: 46, left: 18, top: 26 },
  { size: 30, left: 128, top: 58 },
  { size: 38, left: 236, top: 18 },
];

const ROWS = [
  { initials: 'CW', title: 'Cliff walk, morning', meta: '18 photos' },
  { initials: 'HB', title: 'Harbour bend', meta: '9 photos' },
  { initials: 'LT', title: 'Lighthouse trail', meta: '24 photos' },
  { initials: 'SB', title: 'South beach', meta: '11 photos' },
];

/**
 * Parallax specimen: one scroll, three layers answering different fractions of
 * it. The band and its clouds move a fifth of the way, the title a little over
 * half, and the sheet of content the whole way, which is the only reason the band
 * reads as being behind anything.
 *
 * The subject is the scrolling scene rather than any single layer, because no
 * layer is the term: a band moving slowly is just a band, and parallax is the
 * difference between two rates. It is still not the whole specimen, so identify
 * stays available and rings the scene inside its frame (SPEC §5-6).
 *
 * Transforms are driven from this container's own `scroll` event, never from the
 * page's, and they translate the slow layers back down by the part of the scroll
 * they are not answering. That keeps every layer inside the flow it belongs to
 * and means nothing here can move unless the reader (or the script) scrolls: the
 * one form of motion that WCAG's animation-from-interactions criterion is about,
 * and the reason it is the term instead of decoration.
 *
 * `data-parted` is measured, not assumed. The demo remembers the gap between the
 * back layer and the sheet on mount and says so when the layers have actually
 * come apart on screen, which is what a choreography can then prove.
 */
export function mount(root: HTMLElement): void {
  const clouds = CLOUDS.map(
    (cloud) => `
      <span
        style="position: absolute; left: ${cloud.left}px; top: ${cloud.top}px; width: ${cloud.size}px;
               height: ${cloud.size}px; border-radius: 50%; background: var(--sp-surface); opacity: 0.55"
      ></span>`,
  ).join('');

  const rows = ROWS.map(
    (row) => `
      <li class="sp-list-item">
        <span class="sp-avatar">${row.initials}</span>
        <span class="sp-stack sp-grow" style="gap: 2px">
          <span class="sp-text sp-text--ink">${row.title}</span>
          <span class="sp-label">${row.meta}</span>
        </span>
      </li>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame" style="width: 358px; height: 254px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Albums</span>
          <span class="sp-label">scroll the scene</span>
        </div>
        <div class="sp-body" style="padding: 0">
          <div
            class="sp-scroll"
            data-part="scene"
            data-subject
            style="position: relative; height: 100%; overflow: hidden auto; background: var(--sp-accent-soft)"
          >
            <div
              data-part="layer-back"
              style="position: absolute; top: 0; left: 0; right: 0; height: 164px; overflow: hidden;
                     background: var(--sp-accent-soft)"
            >${clouds}</div>
            <div
              class="sp-stack"
              data-part="layer-mid"
              style="position: absolute; top: 106px; left: 18px; gap: 2px"
            >
              <span class="sp-heading" style="font-size: 17px">Coast, 2019</span>
              <span class="sp-text sp-text--ink" style="font-size: 12px">Four albums</span>
            </div>
            <div
              class="sp-surface"
              data-part="layer-front"
              style="position: relative; margin-top: 146px; padding: 6px 8px 14px; border-bottom: 0;
                     border-radius: var(--sp-radius) var(--sp-radius) 0 0; box-shadow: var(--sp-shadow)"
            >
              <ul class="sp-list">${rows}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const scene = part(root, 'scene');
  const back = part(root, 'layer-back');
  const mid = part(root, 'layer-mid');
  const front = part(root, 'layer-front');

  const gapNow = () => localBox(front, back).top;
  const resting = gapNow();

  const sync = () => {
    const y = scene.scrollTop;
    back.style.transform = `translateY(${(y * (1 - RATES.back)).toFixed(1)}px)`;
    mid.style.transform = `translateY(${(y * (1 - RATES.mid)).toFixed(1)}px)`;
    flag(scene, 'data-parted', Math.abs(gapNow() - resting) > 24);
  };

  scene.addEventListener('scroll', sync);
  sync();
}
