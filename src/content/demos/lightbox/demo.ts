import { icon } from '#src/kit/icons.ts';
import { flag, part } from '#src/kit/parts.ts';

const SHOTS = [
  { name: 'Harbour, dusk', wash: 'linear-gradient(135deg, #5b8def, #9b6ef3)' },
  { name: 'Rooftop, noon', wash: 'linear-gradient(135deg, #f2913d, #e0554f)' },
  { name: 'Estuary, dawn', wash: 'linear-gradient(135deg, #2fb8a5, #3d7ff2)' },
  { name: 'Terrace, rain', wash: 'linear-gradient(135deg, #f6c15b, #ef7d5a)' },
  { name: 'Quarry, noon', wash: 'linear-gradient(135deg, #8b8f9a, #4f5563)' },
  { name: 'Lighthouse', wash: 'linear-gradient(135deg, #3ec7d8, #2f6fd0)' },
];

/** Controls have to survive the picture, so they carry a surface of their own. */
const OVER_IMAGE = 'color: #ffffff; background: rgb(255 255 255 / 0.18)';

/**
 * Lightbox specimen: a grid of photographs, one of them opened large over the
 * dimmed grid, with arrows, a counter, and a dismiss. The subject is the overlay,
 * since the term names the darkened layer with its one picture rather than the
 * grid it came from or the thumbnail that opened it.
 *
 * Every control resolves to an absolute index through one `show()` (SPEC §8), so
 * the arrows compute a neighbour and hand it over and no step depends on the state
 * it happened to find. The overlay is out of flow and the framed picture is a
 * fixed size, so opening it moves nothing and the arrows do not shift between
 * images (SPEC §5).
 */
export function mount(root: HTMLElement): void {
  const thumbs = SHOTS.map(
    ({ name, wash }, i) => `
      <button
        class="sp-button sp-button--ghost"
        type="button"
        data-part="thumb-${i + 1}"
        aria-label="Open ${name}"
        style="padding: 3px; height: 58px"
      >
        <span class="sp-swatch" style="display: block; width: 100%; height: 100%; --sp-swatch: ${wash}"></span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 268px">
        <div class="sp-topbar sp-context">
          <span class="sp-heading sp-grow">Field notes</span>
          <span class="sp-text">6 photos</span>
        </div>
        <div class="sp-body sp-context">
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); gap: 10px">${thumbs}</div>
        </div>
        <div
          class="sp-scrim"
          data-part="lightbox"
          data-subject
          data-index="0"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; background: rgb(12 16 26 / 0.84)"
        >
          <div class="sp-row" style="gap: 14px">
            <button class="sp-icon-button" type="button" data-part="prev" aria-label="Previous photo" style="${OVER_IMAGE}">${icon('chevronLeft')}</button>
            <span
              class="sp-swatch"
              data-part="picture"
              style="width: 196px; height: 128px; --sp-swatch: ${SHOTS[0]?.wash}; box-shadow: var(--sp-shadow)"
            ></span>
            <button class="sp-icon-button" type="button" data-part="next" aria-label="Next photo" style="${OVER_IMAGE}">${icon('chevronRight')}</button>
          </div>
          <div class="sp-row" style="gap: 10px">
            <span data-part="caption" style="color: #ffffff; font-size: 13px">${SHOTS[0]?.name}</span>
            <span data-part="counter" style="color: rgb(255 255 255 / 0.72); font-size: 12px; font-variant-numeric: tabular-nums">1 of ${SHOTS.length}</span>
          </div>
          <button
            class="sp-icon-button"
            type="button"
            data-part="close"
            aria-label="Close photo viewer"
            style="position: absolute; top: 10px; right: 10px; ${OVER_IMAGE}"
          >${icon('close')}</button>
        </div>
      </div>
    </div>
  `;

  const lightbox = part(root, 'lightbox');
  const picture = part(root, 'picture');
  const caption = part(root, 'caption');
  const counter = part(root, 'counter');

  /** Absolute, one-based: the index the counter reads out. */
  const show = (index: number) => {
    const wrapped = ((index - 1 + SHOTS.length) % SHOTS.length) + 1;
    const shot = SHOTS[wrapped - 1];
    if (!shot) return;
    lightbox.dataset.index = String(wrapped);
    picture.style.setProperty('--sp-swatch', shot.wash);
    caption.textContent = shot.name;
    counter.textContent = `${wrapped} of ${SHOTS.length}`;
  };

  const open = (index: number) => {
    show(index);
    flag(lightbox, 'data-open', true);
  };

  const close = () => {
    flag(lightbox, 'data-open', false);
    lightbox.dataset.index = '0';
  };

  const current = () => Number(lightbox.dataset.index ?? '1');

  SHOTS.forEach((_, i) => {
    part(root, `thumb-${i + 1}`).addEventListener('click', () => open(i + 1));
  });

  part(root, 'prev').addEventListener('click', () => show(current() - 1));
  part(root, 'next').addEventListener('click', () => show(current() + 1));
  part(root, 'close').addEventListener('click', close);

  // A press on the dimmed area itself closes; a press on the picture or a control
  // is not the backdrop, however much of the frame the backdrop covers.
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });

  root.addEventListener('keydown', (event) => {
    // The keys belong to the overlay, so they do nothing while the grid is the page.
    if (!lightbox.hasAttribute('data-open')) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowRight') show(current() + 1);
    else if (event.key === 'ArrowLeft') show(current() - 1);
    else return;
    event.preventDefault();
  });
}
