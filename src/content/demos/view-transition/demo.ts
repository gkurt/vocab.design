import { part } from '#src/kit/parts.ts';

/** The one name the two views share, which is what makes the browser morph rather than cut. */
const SHARED = 'shot';

const SHOTS = [
  { key: 'harbour', label: 'Harbour', hue: 236 },
  { key: 'orchard', label: 'Orchard', hue: 146 },
  { key: 'ember', label: 'Ember', hue: 52 },
];

const paint = (hue: number, light: number) => `oklch(${light} 0.13 ${hue})`;

/**
 * View transition specimen: a gallery that opens one shot, where the thumbnail
 * and the detail hero carry the same `view-transition-name` and the browser
 * animates between the two snapshots rather than swapping them.
 *
 * This is the specimen that needs `demo: iframe` (SPEC §5–6).
 * `document.startViewTransition` is document-scoped and has no shadow-root
 * equivalent, so in the default isolation mode the term could only ever have been
 * faked with a hand-written animation, which is the thing the API replaced.
 */
export function mount(root: HTMLElement): void {
  const cards = SHOTS.map(
    (shot) => `
      <button class="sp-button sp-button--quiet sp-stack" data-part="card-${shot.key}" style="gap: 6px; padding: 0; height: auto">
        <span class="sp-swatch" data-part="thumb-${shot.key}" style="display: block; width: 100%; height: 62px; --sp-swatch: ${paint(shot.hue, 0.72)}"></span>
        <span class="sp-label">${shot.label}</span>
      </button>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-window" style="width: 320px; height: 190px; overflow: hidden">
        <div data-part="gallery">
          <span class="sp-label sp-context">Gallery</span>
          <div class="sp-grid" style="grid-template-columns: repeat(3, 1fr); margin-top: 10px">${cards}</div>
        </div>
        <div data-part="detail" hidden>
          <div class="sp-row sp-row--between sp-context">
            <span class="sp-label" data-part="caption"></span>
            <button class="sp-button sp-button--ghost sp-button--sm" data-part="back">Back</button>
          </div>
          <span class="sp-swatch" data-part="hero" data-subject style="display: block; margin-top: 10px; height: 116px"></span>
        </div>
      </div>
    </div>
  `;

  const gallery = part(root, 'gallery');
  const detail = part(root, 'detail');
  const hero = part(root, 'hero');
  const caption = part(root, 'caption');
  let showing: string | undefined;

  /**
   * Two elements holding the same name at once aborts the transition, so the name
   * is never copied, only moved: whichever element is about to be photographed has
   * it, and nothing else does.
   */
  const nameOnly = (el: HTMLElement) => {
    hero.style.viewTransitionName = '';
    for (const shot of SHOTS) part(root, `thumb-${shot.key}`).style.viewTransitionName = '';
    el.style.viewTransitionName = SHARED;
  };

  // A view transition is motion, so it answers the preference like any other. The
  // views still swap; the browser is simply not asked to animate between them.
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const swap = (update: () => void) => {
    const start = document.startViewTransition?.bind(document);
    if (still || !start) {
      update();
      return;
    }
    start(update);
  };

  for (const shot of SHOTS) {
    part(root, `card-${shot.key}`).addEventListener('click', () => {
      if (showing) return;
      // The old snapshot is taken before the callback runs, so the thumbnail has to
      // be wearing the name by now; the hero takes it over inside the callback.
      nameOnly(part(root, `thumb-${shot.key}`));
      swap(() => {
        nameOnly(hero);
        hero.style.setProperty('--sp-swatch', paint(shot.hue, 0.66));
        caption.textContent = shot.label;
        gallery.hidden = true;
        detail.hidden = false;
        showing = shot.key;
      });
    });
  }

  part(root, 'back').addEventListener('click', () => {
    const from = showing;
    if (!from) return;
    nameOnly(hero);
    swap(() => {
      nameOnly(part(root, `thumb-${from}`));
      detail.hidden = true;
      gallery.hidden = false;
      showing = undefined;
    });
  });
}
