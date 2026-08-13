import { icon } from '#src/kit/icons.ts';
import { prefersReducedMotion } from '#src/kit/motion.ts';
import { flag, part } from '#src/kit/parts.ts';

/** How far down the reader has to be before the control is worth showing. */
const THRESHOLD_PX = 96;

const SECTIONS = ['Harbour works', 'Tide tables', 'Ferry times', 'Moorings', 'Slipway repairs', 'Notices'];

/**
 * Back to top specimen: a long scroller whose corner control is absent at the top,
 * arrives once the top is genuinely gone, and puts the reader back in one press.
 *
 * The subject is the control itself. The article is scenery: what the term names is
 * the button, not the scrolling, and the same button on a short page would be the
 * same word doing nothing. It is positioned against the frame rather than laid out
 * in it, so arriving and leaving move no text (SPEC §5), and it sits inset from the
 * frame's edges the way a real one has to clear a footer and a home indicator.
 *
 * The return is smooth unless the reader has asked for less movement, where a flight
 * through the whole document is the one move the preference is about (SPEC §7).
 */
export function mount(root: HTMLElement): void {
  const article = SECTIONS.map(
    (title) => `
      <section style="padding-bottom: 16px">
        <div class="sp-heading">${title}</div>
        <div class="sp-stack" style="margin-top: 8px">
          <div class="sp-line" style="width: 94%"></div>
          <div class="sp-line" style="width: 81%"></div>
          <div class="sp-line" style="width: 88%"></div>
          <div class="sp-line" style="width: 63%"></div>
        </div>
      </section>`,
  ).join('');

  root.innerHTML = `
    <div class="sp-app">
      <div class="sp-frame sp-frame--wide" style="height: 262px">
        <div class="sp-topbar sp-context"><span class="sp-heading sp-grow">Harbour notices</span></div>
        <div class="sp-body sp-context" style="padding: 0">
          <div class="sp-scroll" data-part="doc" data-at="top" style="height: 100%; padding: 12px 14px">${article}</div>
        </div>
        <button
          class="sp-button sp-button--sm"
          data-part="totop"
          data-subject
          type="button"
          style="position: absolute; right: 14px; bottom: 14px; display: inline-flex; align-items: center; gap: 6px;
                 opacity: 0; visibility: hidden; translate: 0 6px;
                 transition: opacity 0.2s, visibility 0.2s, translate 0.2s var(--sp-ease)"
        >
          <span style="display: inline-flex; rotate: 180deg">${icon('chevronDown')}</span>
          Back to top
        </button>
      </div>
      <span class="sp-label sp-context">Nothing to press until the top is actually gone.</span>
    </div>
  `;

  const doc = part(root, 'doc');
  const button = part(root, 'totop');

  const sync = () => {
    const away = doc.scrollTop > THRESHOLD_PX;
    doc.dataset.at = doc.scrollTop > 2 ? 'away' : 'top';
    button.style.opacity = away ? '1' : '0';
    button.style.visibility = away ? 'visible' : 'hidden';
    button.style.translate = away ? '0 0' : '0 6px';
    flag(button, 'data-shown', away);
  };

  doc.addEventListener('scroll', sync);

  button.addEventListener('click', () => {
    doc.scrollTo({ top: 0, behavior: prefersReducedMotion(root) ? 'auto' : 'smooth' });
    // A programmatic scroll still fires scroll events, but an instant one can land
    // before the first of them, so the state is settled here as well.
    sync();
  });
}
