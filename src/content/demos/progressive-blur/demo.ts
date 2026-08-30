import { flag, part } from '#src/kit/parts.ts';

/**
 * Progressive blur specimen: two phone screens over the same scene. The subject is the
 * ramped region at the top of the left screen, built the way the effect is actually
 * built: five layers over one strip, each blurring more than the last and each masked by
 * a gradient window nearer the top edge, so the blur accumulates toward the edge and the
 * content dissolves instead of crossing a line. The right screen is scenery: one blur,
 * unmasked, with the seam that gives.
 *
 * Captions under the two screens once read "five masked layers, no edge" and "one blur, one
 * seam". Those describe how the effect is built, which no photo app prints under its own
 * status bar, so both are gone: the smooth dissolve on the left and the seam on the right
 * are the whole comparison, and the article names the technique.
 *
 * Scrolling is what proves it, so the left screen is the scroller a script drives and the
 * twin mirrors its position, which keeps the comparison honest at every offset. Paint is
 * inline because the scene is this term's own: the kit has one accent, and a blur has to
 * have something worth blurring behind it.
 */
const REGION = 74;

/** Blur radius and the mask window that admits it, stated from the bottom of the region up. */
const LAYERS = [
  { blur: 1, from: 0, to: 30 },
  { blur: 1.5, from: 20, to: 52 },
  { blur: 2.5, from: 42, to: 72 },
  { blur: 4, from: 62, to: 86 },
  { blur: 6, from: 80, to: 100 },
];

const SKY = 'linear-gradient(180deg, #2b3f8f 0%, #6f6fd0 46%, #e98a6b 78%, #f7c78a 100%)';

const TOWERS = [
  { left: 6, width: 20, height: 30, tone: 'rgb(24 20 48 / 0.86)' },
  { left: 28, width: 14, height: 46, tone: 'rgb(18 16 40 / 0.9)' },
  { left: 44, width: 24, height: 24, tone: 'rgb(28 22 54 / 0.82)' },
  { left: 70, width: 12, height: 40, tone: 'rgb(18 16 40 / 0.9)' },
  { left: 84, width: 14, height: 18, tone: 'rgb(30 24 56 / 0.8)' },
];

const ROWS = [
  { title: 'Harbour, 06:12', wash: 'linear-gradient(120deg, #f6a06a, #e2617f)' },
  { title: 'Bridge, 07:40', wash: 'linear-gradient(120deg, #7c9cf3, #6ad1c8)' },
  { title: 'Rooftops, 18:05', wash: 'linear-gradient(120deg, #f5c46b, #ef7c5c)' },
  { title: 'Tower, 19:22', wash: 'linear-gradient(120deg, #8f7bf0, #4f6bd6)' },
  { title: 'Quay, 21:48', wash: 'linear-gradient(120deg, #4b6ef5, #2b2f6e)' },
];

function ramp(): string {
  return LAYERS.map((layer) => {
    const mask = `linear-gradient(to top, transparent ${layer.from}%, #000 ${layer.to}%, #000 100%)`;
    return `<span style="position: absolute; inset: 0; backdrop-filter: blur(${layer.blur}px); -webkit-backdrop-filter: blur(${layer.blur}px); mask-image: ${mask}; -webkit-mask-image: ${mask}"></span>`;
  }).join('');
}

function scene(): string {
  const towers = TOWERS.map(
    (tower) =>
      `<span style="position: absolute; left: ${tower.left}%; bottom: 0; width: ${tower.width}%; height: ${tower.height}px; background: ${tower.tone}"></span>`,
  ).join('');

  const rows = ROWS.map(
    (row) => `
      <div style="display: flex; align-items: center; gap: 8px; padding: 6px 10px">
        <span style="flex: 0 0 auto; width: 38px; height: 30px; border-radius: 6px; background: ${row.wash}"></span>
        <span style="font-size: 11px; color: #f2f3f8">${row.title}</span>
      </div>`,
  ).join('');

  return `
    <div aria-hidden="true" style="position: relative; height: 104px; background: ${SKY}">
      <span style="position: absolute; right: 18%; top: 26px; width: 26px; height: 26px; border-radius: 50%; background: radial-gradient(circle, #fff2c4, #ffb35c 70%, rgb(255 179 92 / 0))"></span>
      ${towers}
    </div>
    <div style="padding: 4px 0 12px; background: #191b2c">${rows}</div>`;
}

function screen(kind: 'ramp' | 'hard'): string {
  const cover =
    kind === 'ramp'
      ? `<div data-part="ramp" data-subject style="position: absolute; left: 0; right: 0; top: 0; height: ${REGION}px; pointer-events: none">${ramp()}</div>`
      : `<div data-part="hard" style="position: absolute; left: 0; right: 0; top: 0; height: ${REGION}px; pointer-events: none; backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px)"></div>`;

  return `
    <div style="position: relative; width: 168px; height: 228px; border-radius: 20px; border: 1px solid rgb(255 255 255 / 0.24); background: #191b2c; overflow: hidden">
      <div class="sp-scroll" data-part="scroller-${kind}" style="position: absolute; inset: 0; scrollbar-width: none">${scene()}</div>
      ${cover}
      <div style="position: absolute; left: 0; right: 0; top: 0; display: flex; justify-content: space-between; padding: 9px 13px; color: #ffffff; font-size: 11px; font-weight: 600; pointer-events: none">
        <span>9:41</span>
        <span data-part="title-${kind}" style="letter-spacing: 0.02em">Skyline</span>
      </div>
    </div>`;
}

export function mount(root: HTMLElement): void {
  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-row" style="align-items: flex-start; gap: 20px">
        <div class="sp-stack" style="gap: 7px; align-items: center">
          ${screen('ramp')}
        </div>
        <div class="sp-stack sp-context" style="gap: 7px; align-items: center">
          ${screen('hard')}
        </div>
      </div>
    </div>
  `;

  const driven = part(root, 'scroller-ramp');
  const twin = part(root, 'scroller-hard');

  // The twin follows rather than being scrolled itself: one script-driven scroller keeps
  // both screens at the same offset, so the seam is compared against the ramp fairly.
  driven.addEventListener('scroll', () => {
    twin.scrollTop = driven.scrollTop;
    flag(driven, 'data-scrolled', driven.scrollTop > 40);
  });
}
